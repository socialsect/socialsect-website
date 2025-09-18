from fastapi import FastAPI, UploadFile, File, Form, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional, AsyncGenerator
import numpy as np
import cv2
import torch
from ultralytics import YOLO
import asyncio
from concurrent.futures import ThreadPoolExecutor
import base64
import time
from functools import lru_cache
import hashlib
import io
import json
import queue
import threading

app = FastAPI()

# Allow CORS for testing/dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"]
)

# Optimized thread pool for better performance
executor = ThreadPoolExecutor(max_workers=8)

model = None
device = 'cuda' if torch.cuda.is_available() else 'cpu'

# Low-level performance knobs (accuracy-neutral)
try:
    # Enable cuDNN autotuner and TF32 where beneficial
    if torch.backends.cudnn.is_available():
        torch.backends.cudnn.benchmark = True
        torch.backends.cudnn.allow_tf32 = True
    if hasattr(torch.backends, 'cuda'):
        torch.backends.cuda.matmul.allow_tf32 = True
    # Avoid CPU thread oversubscription
    torch.set_num_threads(max(1, torch.get_num_threads()))
except Exception:
    pass

try:
    # Limit OpenCV threading to avoid contention with Torch threads
    cv2.setNumThreads(1)
except Exception:
    pass

# Performance settings
TARGET_SIZE = 640  # YOLO optimal size
JPEG_QUALITY = 60  # Aggressive compression for speed
CACHE_SIZE = 200   # Larger cache for better hit rate
ENABLE_STREAMING = True  # Enable streaming responses
ENABLE_ASYNC_POSTPROCESSING = False  # Async post-processing

# Global cache for processed frames
frame_cache = {}

# Pre-allocated buffers for zero-copy operations
_image_buffer = np.zeros((TARGET_SIZE, TARGET_SIZE, 3), dtype=np.uint8)
_encoding_params = [cv2.IMWRITE_JPEG_QUALITY, JPEG_QUALITY, cv2.IMWRITE_JPEG_OPTIMIZE, 1]

# Async processing queue
processing_queue = queue.Queue(maxsize=100)
result_cache = {}

# Performance monitoring
performance_stats = {
    'total_requests': 0,
    'cache_hits': 0,
    'avg_latency': 0.0,
    'min_latency': 0.0,
    'max_latency': 0.0
}

@app.on_event("startup")
def load_model():
    global model
    model = YOLO('best.pt')
    model.to(device)
    
    # Optimize model for inference
    if hasattr(model.model, 'half'):
        model.model.half()  # Use FP16 for faster inference
    
    # Warmup with multiple dummy images
    dummy_img = np.zeros((TARGET_SIZE, TARGET_SIZE, 3), dtype=np.uint8)
    for _ in range(3):  # Multiple warmup runs
        _ = model(dummy_img, conf=0.3, verbose=False)
    
    print(f"Model loaded on {device} with optimizations enabled")
    
    # Start periodic cleanup task
    import asyncio
    asyncio.create_task(periodic_cleanup())

async def periodic_cleanup():
    """Periodic cleanup task to remove old sessions"""
    while True:
        await asyncio.sleep(300)  # Run every 5 minutes
        cleanup_old_sessions()

class TrajectoryReq(BaseModel):
    points: List[List[float]]
    session_id: Optional[str] = 'default'

class BatchDetectReq(BaseModel):
    frames: List[str]  # Base64 encoded frames
    session_id: Optional[str] = 'default'

# ===== TRAJECTORY ANALYSIS SYSTEM =====

from dataclasses import dataclass
from enum import Enum
from typing import Dict, Tuple
import math
from sklearn.decomposition import PCA

@dataclass(frozen=True)
class Detection:
    """Enhanced detection with trajectory tracking capabilities"""
    bbox: List[float]  # [x1, y1, x2, y2]
    confidence: float
    class_id: int
    center_x: float
    center_y: float
    width: float
    height: float
    frame_index: int
    timestamp: float

@dataclass
class TrajectoryPoint:
    """Point in a trajectory with velocity information"""
    x: float
    y: float
    frame_index: int
    timestamp: float
    confidence: float
    velocity_x: float = 0.0
    velocity_y: float = 0.0
    cropped_image: Optional[np.ndarray] = None  # Store the cropped object image

@dataclass
class Trajectory:
    """Complete trajectory of an object"""
    trajectory_id: str
    points: List[TrajectoryPoint]
    class_id: int
    start_frame: int
    end_frame: int
    duration: float
    total_distance: float
    avg_speed: float
    max_speed: float
    is_active: bool = True

@dataclass
class CenterLine:
    """Reference center line for trajectory analysis"""
    start_x: float
    start_y: float
    end_x: float
    end_y: float
    angle: float
    length: float

class ArcType(Enum):
    """7 predefined arc types for classification"""
    STRAIGHT = "straight"
    SLIGHT_ARC = "slight_arc"
    STRONG_ARC = "strong_arc"
    SLIGHT_TO_STRAIGHT_ARC = "slight_to_straight_arc"
    STRAIGHT_TO_SLIGHT_ARC = "straight_to_slight_arc"
    STRONG_ARC_TO_STRAIGHT_ARC = "strong_arc_to_straight_arc"
    STRAIGHT_ARC_TO_STRONG_ARC = "straight_arc_to_strong_arc"

@dataclass
class CurvaturePoint:
    """Point with curvature information"""
    x: float
    y: float
    curvature: float
    frame_index: int

@dataclass
class ArcClassification:
    """Result of arc classification"""
    arc_type: ArcType
    confidence: float
    reasoning: str
    curvature_profile: List[CurvaturePoint]
    transition_points: List[int]

class TrajectoryAnalyzer:
    """Main trajectory analysis engine"""
    
    def __init__(self, max_distance_threshold: float = 120.0, min_trajectory_length: int = 3):
        self.max_distance_threshold = max_distance_threshold
        self.min_trajectory_length = min_trajectory_length
        self.active_trajectories: Dict[str, Trajectory] = {}
        self.completed_trajectories: List[Trajectory] = []
        self.center_line: Optional[CenterLine] = None
        self.session_stats = {
            'total_trajectories': 0,
            'active_trajectories': 0,
            'completed_trajectories': 0
        }

    def process_detections(self, detections: List[Dict], frame_index: int, timestamp: float, frame: np.ndarray = None) -> Dict:
        """Process new detections and update trajectories"""
        print(f"Processing detections for frame {frame_index}: {len(detections)} detections")
        
        # Convert detections to our format
        new_detections = self._convert_detections(detections, frame_index, timestamp)
        print(f"Converted to {len(new_detections)} detection objects")
        
        # Associate with existing trajectories
        associated_trajectories = self._associate_detections(new_detections)
        print(f"Associated with {sum(len(dets) for dets in associated_trajectories.values())} existing trajectories")
        
        # Create new trajectories for unassociated detections
        new_trajectories = self._create_new_trajectories(new_detections, associated_trajectories, frame)
        print(f"Created {len(new_trajectories)} new trajectories")
        
        # Update trajectory statistics
        self._update_trajectory_stats()
        
        # Move completed trajectories
        self._move_completed_trajectories()
        
        # Calculate/update center line
        self.calculate_center_line()
        
        print(f"Current state: {len(self.active_trajectories)} active, {len(self.completed_trajectories)} completed")
        
        return {
            'active_trajectories': len(self.active_trajectories),
            'completed_trajectories': len(self.completed_trajectories),
            'new_trajectories_created': len(new_trajectories),
            'center_line': self.center_line.__dict__ if self.center_line else None
        }

    def _convert_detections(self, detections: List[Dict], frame_index: int, timestamp: float) -> List[Detection]:
        """Convert raw detections to Detection objects"""
        converted = []
        for det in detections:
            x1, y1, x2, y2 = det['bbox']
            center_x = (x1 + x2) / 2
            center_y = (y1 + y2) / 2
            width = x2 - x1
            height = y2 - y1
            
            converted.append(Detection(
                bbox=det['bbox'],
                confidence=det['confidence'],
                class_id=det['class'],
                center_x=center_x,
                center_y=center_y,
                width=width,
                height=height,
                frame_index=frame_index,
                timestamp=timestamp
            ))
        return converted

    def _associate_detections(self, new_detections: List[Detection]) -> Dict[str, List[Detection]]:
        """Associate new detections with existing trajectories"""
        associated = {traj_id: [] for traj_id in self.active_trajectories.keys()}
        
        for detection in new_detections:
            best_trajectory = None
            best_distance = float('inf')
            
            for traj_id, trajectory in self.active_trajectories.items():
                if not trajectory.points:
                    continue
                    
                # Get last point
                last_point = trajectory.points[-1]
                
                # Calculate distance
                distance = math.sqrt(
                    (detection.center_x - last_point.x) ** 2 + 
                    (detection.center_y - last_point.y) ** 2
                )
                
                if distance < self.max_distance_threshold and distance < best_distance:
                    best_distance = distance
                    best_trajectory = traj_id
            
            if best_trajectory:
                associated[best_trajectory].append(detection)
        
        return associated

    def _create_new_trajectories(self, new_detections: List[Detection], associated: Dict[str, List[Detection]], frame: np.ndarray = None) -> List[str]:
        """Create new trajectories for unassociated detections"""
        associated_detections = []
        for detections in associated.values():
            associated_detections.extend(detections)
        
        new_trajectory_ids = []
        for detection in new_detections:
            if detection not in associated_detections:
                traj_id = f"traj_{len(self.active_trajectories) + len(self.completed_trajectories)}"
                
                # Create trajectory point
                point = TrajectoryPoint(
                    x=detection.center_x,
                    y=detection.center_y,
                    frame_index=detection.frame_index,
                    timestamp=detection.timestamp,
                    confidence=detection.confidence
                )
                
                # Create new trajectory
                trajectory = Trajectory(
                    trajectory_id=traj_id,
                    points=[point],
                    class_id=detection.class_id,
                    start_frame=detection.frame_index,
                    end_frame=detection.frame_index,
                    duration=0.0,
                    total_distance=0.0,
                    avg_speed=0.0,
                    max_speed=0.0
                )
                
                self.active_trajectories[traj_id] = trajectory
                new_trajectory_ids.append(traj_id)
        
        # Add points to existing trajectories
        for traj_id, detections in associated.items():
            if detections:  # Only process if there are detections
                trajectory = self.active_trajectories.get(traj_id)
                if trajectory:
                    for detection in detections:
                        self._add_point_to_trajectory(trajectory, detection, frame)
        
        return new_trajectory_ids

    def _add_point_to_trajectory(self, trajectory: Trajectory, detection: Detection, frame: np.ndarray = None):
        """Add a new point to a trajectory and calculate velocity"""
        # Calculate velocity from last point
        velocity_x = 0.0
        velocity_y = 0.0
        
        if trajectory.points:
            last_point = trajectory.points[-1]
            time_diff = detection.timestamp - last_point.timestamp
            if time_diff > 0:
                velocity_x = (detection.center_x - last_point.x) / time_diff
                velocity_y = (detection.center_y - last_point.y) / time_diff
        
        # Crop the object from the frame if frame is provided
        cropped_image = None
        if frame is not None:
            x1, y1, x2, y2 = map(int, detection.bbox[:4])
            # Ensure coordinates are within frame bounds
            x1 = max(0, min(x1, frame.shape[1]))
            y1 = max(0, min(y1, frame.shape[0]))
            x2 = max(0, min(x2, frame.shape[1]))
            y2 = max(0, min(y2, frame.shape[0]))
            
            if x2 > x1 and y2 > y1:
                cropped_image = frame[y1:y2, x1:x2].copy()
        
        # Create new point
        point = TrajectoryPoint(
            x=detection.center_x,
            y=detection.center_y,
            frame_index=detection.frame_index,
            timestamp=detection.timestamp,
            confidence=detection.confidence,
            velocity_x=velocity_x,
            velocity_y=velocity_y,
            cropped_image=cropped_image
        )
        
        trajectory.points.append(point)
        trajectory.end_frame = detection.frame_index
        trajectory.duration = detection.timestamp - trajectory.points[0].timestamp

    def _update_trajectory_stats(self):
        """Update statistics for all active trajectories"""
        for trajectory in self.active_trajectories.values():
            if len(trajectory.points) < 2:
                continue
                
            # Calculate total distance
            total_distance = 0.0
            speeds = []
            
            for i in range(1, len(trajectory.points)):
                prev_point = trajectory.points[i-1]
                curr_point = trajectory.points[i]
                
                distance = math.sqrt(
                    (curr_point.x - prev_point.x) ** 2 + 
                    (curr_point.y - prev_point.y) ** 2
                )
                total_distance += distance
                
                # Calculate speed
                time_diff = curr_point.timestamp - prev_point.timestamp
                if time_diff > 0:
                    speed = distance / time_diff
                    speeds.append(speed)
            
            trajectory.total_distance = total_distance
            trajectory.avg_speed = sum(speeds) / len(speeds) if speeds else 0.0
            trajectory.max_speed = max(speeds) if speeds else 0.0

    def _move_completed_trajectories(self):
        """Move trajectories that haven't been updated recently to completed"""
        current_time = time.time()
        completed_ids = []
        
        for traj_id, trajectory in self.active_trajectories.items():
            if trajectory.points and len(trajectory.points) >= self.min_trajectory_length:
                last_update = trajectory.points[-1].timestamp
                # For video processing, use a shorter timeout (0.5 seconds)
                # Also complete trajectories that have enough points and haven't been updated recently
                if current_time - last_update > 0.5:  # 0.5 seconds timeout for video processing
                    trajectory.is_active = False
                    self.completed_trajectories.append(trajectory)
                    completed_ids.append(traj_id)
                    print(f"Completed trajectory {traj_id} with {len(trajectory.points)} points")
        
        for traj_id in completed_ids:
            del self.active_trajectories[traj_id]

    def force_complete_long_trajectories(self, min_points: int = 10):
        """Force complete trajectories that have enough points for analysis"""
        completed_ids = []
        
        print(f"Force completing trajectories with min_points={min_points}")
        print(f"Active trajectories before: {len(self.active_trajectories)}")
        
        for traj_id, trajectory in self.active_trajectories.items():
            if trajectory.points and len(trajectory.points) >= min_points:
                trajectory.is_active = False
                self.completed_trajectories.append(trajectory)
                completed_ids.append(traj_id)
                print(f"Force completed trajectory {traj_id} with {len(trajectory.points)} points")
            else:
                print(f"Trajectory {traj_id} has {len(trajectory.points) if trajectory.points else 0} points (need {min_points})")
        
        for traj_id in completed_ids:
            del self.active_trajectories[traj_id]
        
        print(f"Active trajectories after: {len(self.active_trajectories)}")
        print(f"Completed trajectories: {len(self.completed_trajectories)}")

    def calculate_center_line(self):
        """Calculate optimal center line using PCA"""
        if not self.active_trajectories and not self.completed_trajectories:
            return
        
        # Collect all trajectory points
        all_points = []
        for trajectory in list(self.active_trajectories.values()) + self.completed_trajectories:
            for point in trajectory.points:
                all_points.append([point.x, point.y])
        
        if len(all_points) < 2:
            return
        
        # Use PCA to find principal direction
        points_array = np.array(all_points)
        pca = PCA(n_components=2)
        pca.fit(points_array)
        
        # Get the first principal component (main direction)
        center = np.mean(points_array, axis=0)
        direction = pca.components_[0]
        
        # Project all points onto the principal axis to find extent
        projections = np.dot(points_array - center, direction)
        min_proj = np.min(projections)
        max_proj = np.max(projections)
        
        # Create center line
        start_point = center + min_proj * direction
        end_point = center + max_proj * direction
        
        angle = math.atan2(end_point[1] - start_point[1], end_point[0] - start_point[0])
        length = math.sqrt((end_point[0] - start_point[0])**2 + (end_point[1] - start_point[1])**2)
        
        self.center_line = CenterLine(
            start_x=float(start_point[0]),
            start_y=float(start_point[1]),
            end_x=float(end_point[0]),
            end_y=float(end_point[1]),
            angle=float(angle),
            length=float(length)
        )

    def analyze_trajectory_relative_to_center_line(self, trajectory: Trajectory) -> Dict:
        """Analyze how a trajectory deviates from the center line"""
        if not self.center_line or not trajectory.points:
            return {"error": "No center line or trajectory points available"}
        
        # Calculate distances from center line for each point
        distances = []
        for point in trajectory.points:
            distance = self._point_to_line_distance(
                point.x, point.y,
                self.center_line.start_x, self.center_line.start_y,
                self.center_line.end_x, self.center_line.end_y
            )
            distances.append(distance)
        
        # Calculate statistics
        avg_distance = np.mean(distances)
        max_distance = np.max(distances)
        distance_variance = np.var(distances)
        
        # Classify path type based on deviation
        if max_distance < 20:
            path_type = "straight"
        elif max_distance < 50:
            path_type = "slightly_curved"
        else:
            path_type = "erratic"
        
        return {
            "avg_distance_from_center": float(avg_distance),
            "max_distance_from_center": float(max_distance),
            "distance_variance": float(distance_variance),
            "path_type": path_type,
            "distances": [float(d) for d in distances]
        }

    def _point_to_line_distance(self, px: float, py: float, x1: float, y1: float, x2: float, y2: float) -> float:
        """Calculate perpendicular distance from point to line"""
        # Line equation: ax + by + c = 0
        a = y2 - y1
        b = x1 - x2
        c = x2 * y1 - x1 * y2
        
        # Distance formula
        distance = abs(a * px + b * py + c) / math.sqrt(a * a + b * b)
        return distance

class FoolproofArcClassifier:
    """Foolproof arc classification system for 7 predefined arc types"""
    
    def __init__(self):
        # Curvature thresholds for classification
        self.STRAIGHT_THRESHOLD = 0.01
        self.SLIGHT_ARC_THRESHOLD = 0.05
        self.STRONG_ARC_THRESHOLD = 0.15
        
        # Transition detection parameters
        self.MIN_POINTS_FOR_TRANSITION = 5
        self.TRANSITION_SENSITIVITY = 0.02
        
        # Confidence scoring weights
        self.CURVATURE_WEIGHT = 0.4
        self.CONSISTENCY_WEIGHT = 0.3
        self.TRANSITION_WEIGHT = 0.3

    def classify_arc(self, trajectory: Trajectory) -> ArcClassification:
        """Classify trajectory into one of 7 arc types with confidence scoring"""
        if len(trajectory.points) < 3:
            return ArcClassification(
                arc_type=ArcType.STRAIGHT,
                confidence=0.0,
                reasoning="Insufficient points for classification",
                curvature_profile=[],
                transition_points=[]
            )
        
        # Calculate curvature profile
        curvature_profile = self._calculate_curvature_profile(trajectory.points)
        
        # Smooth curvature to reduce noise
        smoothed_curvature = self._smooth_curvature(curvature_profile)
        
        # Analyze curvature patterns
        curvature_analysis = self._analyze_curvature_patterns(smoothed_curvature)
        
        # Detect transitions
        transitions = self._detect_transitions(smoothed_curvature)
        
        # Classify based on patterns and transitions
        classification_result = self._classify_based_on_patterns(
            curvature_analysis, transitions, len(trajectory.points)
        )
        
        # Calculate confidence score
        confidence = self._calculate_confidence(
            curvature_analysis, transitions, classification_result
        )
        
        return ArcClassification(
            arc_type=classification_result['arc_type'],
            confidence=confidence,
            reasoning=classification_result['reasoning'],
            curvature_profile=curvature_profile,
            transition_points=transitions
        )

    def _calculate_curvature_profile(self, points: List[TrajectoryPoint]) -> List[CurvaturePoint]:
        """Calculate curvature at each point using three-point method"""
        curvature_points = []
        
        for i in range(1, len(points) - 1):
            p1 = points[i-1]
            p2 = points[i]
            p3 = points[i+1]
            
            # Calculate curvature using the formula: |x'y'' - y'x''| / (x'^2 + y'^2)^(3/2)
            x1, y1 = p1.x, p1.y
            x2, y2 = p2.x, p2.y
            x3, y3 = p3.x, p3.y
            
            # First derivatives
            dx1 = x2 - x1
            dy1 = y2 - y1
            dx2 = x3 - x2
            dy2 = y3 - y2
            
            # Second derivatives
            d2x = dx2 - dx1
            d2y = dy2 - dy1
            
            # Calculate curvature
            numerator = abs(dx1 * d2y - dy1 * d2x)
            denominator = (dx1**2 + dy1**2)**1.5
            
            if denominator > 1e-10:  # Avoid division by zero
                curvature = numerator / denominator
            else:
                curvature = 0.0
            
            curvature_points.append(CurvaturePoint(
                x=p2.x, y=p2.y, curvature=curvature, frame_index=p2.frame_index
            ))
        
        return curvature_points

    def _smooth_curvature(self, curvature_profile: List[CurvaturePoint], window_size: int = 3) -> List[CurvaturePoint]:
        """Smooth curvature profile using moving average"""
        if len(curvature_profile) < window_size:
            return curvature_profile
        
        smoothed = []
        for i in range(len(curvature_profile)):
            start_idx = max(0, i - window_size // 2)
            end_idx = min(len(curvature_profile), i + window_size // 2 + 1)
            
            window_curvatures = [cp.curvature for cp in curvature_profile[start_idx:end_idx]]
            avg_curvature = sum(window_curvatures) / len(window_curvatures)
            
            smoothed.append(CurvaturePoint(
                x=curvature_profile[i].x,
                y=curvature_profile[i].y,
                curvature=avg_curvature,
                frame_index=curvature_profile[i].frame_index
            ))
        
        return smoothed

    def _analyze_curvature_patterns(self, curvature_profile: List[CurvaturePoint]) -> Dict:
        """Analyze overall curvature patterns"""
        curvatures = [cp.curvature for cp in curvature_profile]
        
        avg_curvature = np.mean(curvatures)
        max_curvature = np.max(curvatures)
        curvature_variance = np.var(curvatures)
        
        # Determine dominant curvature level
        if avg_curvature < self.STRAIGHT_THRESHOLD:
            dominant_level = "straight"
        elif avg_curvature < self.SLIGHT_ARC_THRESHOLD:
            dominant_level = "slight"
        elif avg_curvature < self.STRONG_ARC_THRESHOLD:
            dominant_level = "strong"
        else:
            dominant_level = "very_strong"
        
        return {
            "avg_curvature": avg_curvature,
            "max_curvature": max_curvature,
            "variance": curvature_variance,
            "dominant_level": dominant_level,
            "consistency": 1.0 / (1.0 + curvature_variance)  # Higher variance = lower consistency
        }

    def _detect_transitions(self, curvature_profile: List[CurvaturePoint]) -> List[int]:
        """Detect significant transitions in curvature"""
        if len(curvature_profile) < self.MIN_POINTS_FOR_TRANSITION:
            return []
        
        transitions = []
        curvatures = [cp.curvature for cp in curvature_profile]
        
        # Look for significant changes in curvature
        for i in range(1, len(curvatures) - 1):
            # Calculate curvature change rate
            prev_avg = np.mean(curvatures[max(0, i-2):i])
            next_avg = np.mean(curvatures[i+1:min(len(curvatures), i+3)])
            
            change_rate = abs(next_avg - prev_avg)
            
            if change_rate > self.TRANSITION_SENSITIVITY:
                transitions.append(i)
        
        return transitions

    def _classify_based_on_patterns(self, analysis: Dict, transitions: List[int], total_points: int) -> Dict:
        """Classify arc type based on curvature patterns and transitions"""
        dominant_level = analysis["dominant_level"]
        avg_curvature = analysis["avg_curvature"]
        max_curvature = analysis["max_curvature"]
        
        # Determine if there are significant transitions
        has_transitions = len(transitions) > 0 and len(transitions) < total_points // 3
        
        # Classification logic
        if not has_transitions:
            # No transitions - classify based on dominant curvature
            if dominant_level == "straight":
                return {
                    "arc_type": ArcType.STRAIGHT,
                    "reasoning": f"Consistent straight path (avg curvature: {avg_curvature:.4f})"
                }
            elif dominant_level == "slight":
                return {
                    "arc_type": ArcType.SLIGHT_ARC,
                    "reasoning": f"Consistent slight arc (avg curvature: {avg_curvature:.4f})"
                }
            elif dominant_level in ["strong", "very_strong"]:
                return {
                    "arc_type": ArcType.STRONG_ARC,
                    "reasoning": f"Consistent strong arc (avg curvature: {avg_curvature:.4f})"
                }
        else:
            # Has transitions - classify based on transition patterns
            transition_ratio = len(transitions) / total_points
            
            if transition_ratio < 0.1:  # Few transitions
                if dominant_level == "straight":
                    return {
                        "arc_type": ArcType.STRAIGHT_TO_SLIGHT_ARC,
                        "reasoning": f"Mostly straight with slight arc transitions (transitions: {len(transitions)})"
                    }
                elif dominant_level == "slight":
                    return {
                        "arc_type": ArcType.SLIGHT_TO_STRAIGHT_ARC,
                        "reasoning": f"Mostly slight arc with straight transitions (transitions: {len(transitions)})"
                    }
                else:
                    return {
                        "arc_type": ArcType.STRONG_ARC_TO_STRAIGHT_ARC,
                        "reasoning": f"Strong arc transitioning to straight (transitions: {len(transitions)})"
                    }
            else:  # Many transitions
                if max_curvature > self.STRONG_ARC_THRESHOLD:
                    return {
                        "arc_type": ArcType.STRAIGHT_ARC_TO_STRONG_ARC,
                        "reasoning": f"Complex pattern transitioning from straight to strong arc (transitions: {len(transitions)})"
                    }
                else:
                    return {
                        "arc_type": ArcType.SLIGHT_TO_STRAIGHT_ARC,
                        "reasoning": f"Complex pattern with slight arc to straight transitions (transitions: {len(transitions)})"
                    }
        
        # Fallback
        return {
            "arc_type": ArcType.STRAIGHT,
            "reasoning": "Unable to classify - defaulting to straight"
        }

    def _calculate_confidence(self, analysis: Dict, transitions: List[int], classification: Dict) -> float:
        """Calculate confidence score for the classification"""
        # Base confidence from curvature consistency
        consistency_score = analysis["consistency"]
        
        # Transition confidence (fewer transitions = higher confidence for simple patterns)
        if len(transitions) == 0:
            transition_score = 1.0
        elif len(transitions) < 3:
            transition_score = 0.8
        else:
            transition_score = 0.6
        
        # Pattern clarity score
        avg_curvature = analysis["avg_curvature"]
        if avg_curvature < self.STRAIGHT_THRESHOLD:
            clarity_score = 1.0
        elif avg_curvature < self.SLIGHT_ARC_THRESHOLD:
            clarity_score = 0.9
        elif avg_curvature < self.STRONG_ARC_THRESHOLD:
            clarity_score = 0.8
        else:
            clarity_score = 0.7
        
        # Weighted confidence
        confidence = (
            consistency_score * self.CONSISTENCY_WEIGHT +
            transition_score * self.TRANSITION_WEIGHT +
            clarity_score * self.CURVATURE_WEIGHT
        )
        
        return min(1.0, max(0.0, confidence))

# Global arc classifier (can be shared)
arc_classifier = FoolproofArcClassifier()
session_trajectories = {}  # Store trajectories by session
session_analyzers = {}  # Store trajectory analyzers by session

def get_session_analyzer(session_id: str) -> TrajectoryAnalyzer:
    """Get or create a trajectory analyzer for the given session"""
    if session_id not in session_analyzers:
        session_analyzers[session_id] = TrajectoryAnalyzer()
    return session_analyzers[session_id]

def clear_session_data(session_id: str):
    """Clear all data for a specific session"""
    if session_id in session_analyzers:
        del session_analyzers[session_id]
    if session_id in session_trajectories:
        del session_trajectories[session_id]
    print(f"Cleared all data for session: {session_id}")

def cleanup_old_sessions():
    """Clean up old sessions to prevent memory buildup"""
    current_time = time.time()
    sessions_to_remove = []
    
    # Remove sessions older than 1 hour
    for session_id in list(session_analyzers.keys()):
        # Simple heuristic: if session has no recent activity, remove it
        analyzer = session_analyzers[session_id]
        if not analyzer.active_trajectories and not analyzer.completed_trajectories:
            sessions_to_remove.append(session_id)
    
    for session_id in sessions_to_remove:
        clear_session_data(session_id)
    
    if sessions_to_remove:
        print(f"Cleaned up {len(sessions_to_remove)} old sessions")

# Pydantic models for new endpoints
class TrajectoryAnalysisReq(BaseModel):
    detections: List[Dict]
    frame_index: int
    timestamp: float
    session_id: Optional[str] = 'default'

class CenterLineReq(BaseModel):
    start_x: float
    start_y: float
    end_x: float
    end_y: float
    session_id: Optional[str] = 'default'

async def run_in_threadpool(func, *args):
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, lambda: func(*args))

def preprocess_image(file_bytes):
    """Ultra-optimized image preprocessing with zero-copy operations"""
    # Direct buffer access for speed
    arr = np.frombuffer(file_bytes, np.uint8)
    frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    
    # Use pre-allocated buffer for resizing
    if frame.shape[:2] != (TARGET_SIZE, TARGET_SIZE):
        cv2.resize(frame, (TARGET_SIZE, TARGET_SIZE), dst=_image_buffer, interpolation=cv2.INTER_LINEAR)
        return _image_buffer.copy()
    
    return frame

def preprocess_image_fast(file_bytes):
    """Ultra-fast preprocessing with minimal operations"""
    # Skip decoding if possible, work directly with bytes
    arr = np.frombuffer(file_bytes, np.uint8)
    frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    
    # In-place resize for speed
    if frame.shape[:2] != (TARGET_SIZE, TARGET_SIZE):
        frame = cv2.resize(frame, (TARGET_SIZE, TARGET_SIZE), interpolation=cv2.INTER_LINEAR)
    
    return frame

def get_image_hash(frame):
    """Generate hash for caching from ndarray bytes"""
    return hashlib.md5(frame.tobytes()).hexdigest()

def perform_inference(frame, frame_hash: str = None):
    """Ultra-optimized inference with aggressive caching.
    Accepts optional precomputed hash to avoid ndarray.tobytes() cost.
    """
    frame_hash = frame_hash or get_image_hash(frame)
    
    # Check cache first (most common case)
    if frame_hash in frame_cache:
        performance_stats['cache_hits'] += 1
        return frame_cache[frame_hash]
    
    # Perform inference with minimal overhead
    with torch.no_grad():  # Disable gradient computation
        results = model(frame, conf=0.3, verbose=False, half=True)
    
    detections = []
    
    if results and len(results) > 0:
        boxes = results[0].boxes
        if boxes is not None and len(boxes) > 0:
            # Direct numpy conversion without CPU transfer if possible
            data = boxes.data.cpu().numpy()
            detections = [
                {
                "bbox": [float(x1), float(y1), float(x2), float(y2)],
                "confidence": float(conf),
                "class": int(cls),
                }
                for x1, y1, x2, y2, conf, cls in data
            ]
    
    # Aggressive caching
    if len(frame_cache) < CACHE_SIZE:
        frame_cache[frame_hash] = detections
    else:
        # Remove oldest entries in batch
        keys_to_remove = list(frame_cache.keys())[:CACHE_SIZE//4]
        for key in keys_to_remove:
            del frame_cache[key]
        frame_cache[frame_hash] = detections
    
    return detections

def perform_inference_batch(frames):
    """Ultra-fast batch inference"""
    if not frames:
        return []
    
    # Stack frames for batch processing
    batch_frames = np.stack(frames)
    
    with torch.no_grad():
        results = model(batch_frames, conf=0.3, verbose=False, half=True)
    
    all_detections = []
    for i, result in enumerate(results):
        detections = []
        if result.boxes is not None and len(result.boxes) > 0:
            data = result.boxes.data.cpu().numpy()
            detections = [
                {
                    "bbox": [float(x1), float(y1), float(x2), float(y2)],
                    "confidence": float(conf),
                    "class": int(cls),
                }
                for x1, y1, x2, y2, conf, cls in data
            ]
        all_detections.append(detections)
    
    return all_detections

def draw_boxes(frame, detections, center_line=None, trajectory_points=None, trajectory_images=None, session_id=None):
    """Ultra-optimized box drawing with center line and trajectory content"""
    # Only draw center line if it belongs to the current session
    if center_line and session_id:
        start_point = (int(center_line.start_x), int(center_line.start_y))
        end_point = (int(center_line.end_x), int(center_line.end_y))
        cv2.line(frame, start_point, end_point, (255, 0, 0), 2)  # Blue line for center line
        
        # Draw center line endpoints
        cv2.circle(frame, start_point, 5, (255, 0, 0), -1)  # Blue circle for start
        cv2.circle(frame, end_point, 5, (255, 0, 0), -1)    # Blue circle for end
    
    # Only draw trajectory content if it belongs to the current session
    if trajectory_points and trajectory_images and session_id:
        for i, (point, img) in enumerate(zip(trajectory_points, trajectory_images)):
            if img is not None and i % 3 == 0:  # Show every third frame only
                # Use original bounding box size
                img_height, img_width = img.shape[:2]
                
                # Position at actual trajectory point coordinates (centered on the point)
                x = int(point.x) - img_width // 2
                y = int(point.y) - img_height // 2
                
                # Ensure the overlay is within frame bounds
                if x >= 0 and y >= 0 and x + img_width < frame.shape[1] and y + img_height < frame.shape[0]:
                    # Create a semi-transparent overlay with 0.5 opacity
                    alpha = 0.5
                    overlay = frame[y:y+img_height, x:x+img_width].copy()
                    cv2.addWeighted(overlay, 1-alpha, img, alpha, 0, overlay)
                    frame[y:y+img_height, x:x+img_width] = overlay
                    
                    # No red border - removed as requested
    
    # Draw detection center points only (no bounding boxes)
    for det in detections:
        x1, y1, x2, y2 = map(int, det['bbox'][:4])
        conf = det['confidence']
        cls = det['class']
        
        # Calculate center point
        center_x = int((x1 + x2) / 2)
        center_y = int((y1 + y2) / 2)
        
        # Draw center point as a dot only
        cv2.circle(frame, (center_x, center_y), 4, (0, 255, 0), -1)  # Green dot for current center
        
        # Skip text rendering for speed unless high confidence
        if conf > 0.7:
            label = f"{cls}:{conf:.1f}"
            cv2.putText(frame, label, (center_x, center_y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 255, 0), 1)
    
    return frame

def encode_image_fast(frame):
    """Ultra-fast image encoding with pre-allocated buffers"""
    # Use pre-allocated encoding parameters
    success, buffer = cv2.imencode('.jpg', frame, _encoding_params)
    if success:
        return base64.b64encode(buffer).decode()
    return None

def encode_image_streaming(frame):
    """Streaming-optimized encoding"""
    # Use memory buffer for streaming
    buffer = io.BytesIO()
    success, encoded = cv2.imencode('.jpg', frame, _encoding_params)
    if success:
        buffer.write(encoded.tobytes())
        return buffer.getvalue()
    return None

@app.post("/detect")
async def detect(file: UploadFile = File(...), session_id: Optional[str] = Form(None)):
    """Ultra-optimized single frame detection"""
    start_time = time.time()
    performance_stats['total_requests'] += 1
    
    content = await file.read()
    content_hash = hashlib.md5(content).hexdigest()
    frame = await run_in_threadpool(preprocess_image_fast, content)
    detections = await run_in_threadpool(perform_inference, frame, content_hash)
    
    # Process trajectory analysis with frame data
    session_analyzer = get_session_analyzer(session_id or 'default')
    analysis_result = session_analyzer.process_detections(
        detections, 0, time.time(), frame  # Using frame_index=0 and current timestamp
    )
    
    # Async post-processing if enabled
    if ENABLE_ASYNC_POSTPROCESSING:
        # Return immediately with detections, process image async
        processing_time = time.time() - start_time
        update_performance_stats(processing_time)
        
        # Queue image processing for async completion
        asyncio.create_task(process_image_async(frame, detections, session_id))
        
        return {
            "success": True,
            "detections": detections,
            "session_id": session_id,
            "processing_time": round(processing_time * 1000, 1),
            "image_processing": "async"
        }
    else:
        # Synchronous processing
        # Get center line and trajectory points for visualization
        session_analyzer = get_session_analyzer(session_id or 'default')
        center_line = session_analyzer.center_line
        trajectory_points = []
        
        # Collect all trajectory points and images from both active and completed trajectories
        trajectory_images = []
        for trajectory in list(session_analyzer.active_trajectories.values()) + session_analyzer.completed_trajectories:
            trajectory_points.extend(trajectory.points)
            # Collect cropped images from trajectory points
            for point in trajectory.points:
                trajectory_images.append(point.cropped_image)
        
        annotated_frame = draw_boxes(frame.copy(), detections, center_line, trajectory_points, trajectory_images, session_id)
        img_base64 = encode_image_fast(annotated_frame)
        data_uri = f"data:image/jpeg;base64,{img_base64}"
        
        processing_time = time.time() - start_time
        update_performance_stats(processing_time)
        
        return {
            "success": True,
            "detections": detections,
            "annotated_image": data_uri,
            "session_id": session_id,
            "processing_time": round(processing_time * 1000, 1)
        }

@app.post("/detect_fast")
async def detect_fast(file: UploadFile = File(...), session_id: Optional[str] = Form(None)):
    """Ultra-fast detection with minimal overhead"""
    start_time = time.time()
    performance_stats['total_requests'] += 1
    
    content = await file.read()
    content_hash = hashlib.md5(content).hexdigest()
    frame = await run_in_threadpool(preprocess_image_fast, content)
    detections = await run_in_threadpool(perform_inference, frame, content_hash)
    
    processing_time = time.time() - start_time
    update_performance_stats(processing_time)
    
    return {
        "success": True,
        "detections": detections,
        "session_id": session_id,
        "processing_time": round(processing_time * 1000, 1)
    }

@app.post("/detect_stream")
async def detect_stream(file: UploadFile = File(...), session_id: Optional[str] = Form(None)):
    """Streaming detection for real-time processing"""
    start_time = time.time()
    
    content = await file.read()
    frame = await run_in_threadpool(preprocess_image_fast, content)
    detections = await run_in_threadpool(perform_inference, frame)
    
    processing_time = time.time() - start_time
    
    # Stream response
    def generate_response():
        yield f"data: {json.dumps({'detections': detections, 'processing_time': round(processing_time * 1000, 1)})}\n\n"
        
        # Process image in background and stream result
        session_analyzer = get_session_analyzer(session_id or 'default')
        center_line = session_analyzer.center_line
        trajectory_points = []
        trajectory_images = []
        for trajectory in list(session_analyzer.active_trajectories.values()) + session_analyzer.completed_trajectories:
            trajectory_points.extend(trajectory.points)
            for point in trajectory.points:
                trajectory_images.append(point.cropped_image)
        
        annotated_frame = draw_boxes(frame.copy(), detections, center_line, trajectory_points, trajectory_images, session_id)
        img_data = encode_image_streaming(annotated_frame)
        if img_data:
            img_base64 = base64.b64encode(img_data).decode()
            yield f"data: {json.dumps({'image': f'data:image/jpeg;base64,{img_base64}'})}\n\n"
    
    return StreamingResponse(generate_response(), media_type="text/plain")

async def process_image_async(frame, detections, session_id):
    """Async post-processing for non-blocking image generation"""
    try:
        session_analyzer = get_session_analyzer(session_id or 'default')
        center_line = session_analyzer.center_line
        trajectory_points = []
        trajectory_images = []
        for trajectory in list(session_analyzer.active_trajectories.values()) + session_analyzer.completed_trajectories:
            trajectory_points.extend(trajectory.points)
            for point in trajectory.points:
                trajectory_images.append(point.cropped_image)
        
        annotated_frame = draw_boxes(frame.copy(), detections, center_line, trajectory_points, trajectory_images, session_id)
        img_base64 = encode_image_fast(annotated_frame)
        
        # Store result in cache for retrieval
        result_cache[session_id] = {
            "annotated_image": f"data:image/jpeg;base64,{img_base64}",
            "timestamp": time.time()
        }
    except Exception as e:
        print(f"Async processing error: {e}")

def update_performance_stats(processing_time):
    """Update performance statistics"""
    latency_ms = processing_time * 1000
    performance_stats['avg_latency'] = (
        (performance_stats['avg_latency'] * (performance_stats['total_requests'] - 1) + latency_ms) 
        / performance_stats['total_requests']
    )
    
    # Handle min/max latency properly
    if performance_stats['total_requests'] == 1:
        performance_stats['min_latency'] = latency_ms
        performance_stats['max_latency'] = latency_ms
    else:
        performance_stats['min_latency'] = min(performance_stats['min_latency'], latency_ms)
        performance_stats['max_latency'] = max(performance_stats['max_latency'], latency_ms)

def process_batch_frames(frames_data):
    """Process multiple frames in batch for better GPU utilization"""
    results = []
    
    # Convert base64 frames to numpy arrays
    frames = []
    for frame_data in frames_data:
        frame_bytes = base64.b64decode(frame_data)
        frame = preprocess_image(frame_bytes)
        frames.append(frame)
    
    if frames:
        # True batched inference in a single forward
        batched_detections = perform_inference_batch(frames)
        session_analyzer = get_session_analyzer('default')
        center_line = session_analyzer.center_line
        trajectory_points = []
        for trajectory in session_analyzer.active_trajectories.values():
            trajectory_points.extend(trajectory.points)
        
        for i, (frame, detections) in enumerate(zip(frames, batched_detections)):
            annotated_frame = draw_boxes(frame.copy(), detections, center_line, trajectory_points, None, 'default')
            # Encode as JPEG
            _, buffer = cv2.imencode('.jpg', annotated_frame, [cv2.IMWRITE_JPEG_QUALITY, JPEG_QUALITY])
            img_base64 = base64.b64encode(buffer).decode()
            data_uri = f"data:image/jpeg;base64,{img_base64}"
            results.append({
                "frame_index": i,
                "detections": detections,
                "annotated_image": data_uri
            })
    
    return results

@app.post("/detect_batch")
async def detect_batch(req: BatchDetectReq):
    """Batch processing endpoint for multiple frames"""
    start_time = time.time()
    
    results = await run_in_threadpool(process_batch_frames, req.frames)
    
    processing_time = time.time() - start_time
    
    return {
        "success": True,
        "results": results,
        "session_id": req.session_id,
        "total_frames": len(req.frames),
        "processing_time": round(processing_time, 3),
        "fps": round(len(req.frames) / processing_time, 2) if processing_time > 0 else 0
    }

@app.get("/performance")
async def get_performance_stats():
    """Get real-time performance statistics"""
    cache_hit_rate = (performance_stats['cache_hits'] / max(performance_stats['total_requests'], 1)) * 100
    
    return {
        "total_requests": performance_stats['total_requests'],
        "cache_hits": performance_stats['cache_hits'],
        "cache_hit_rate": round(cache_hit_rate, 2),
        "avg_latency_ms": round(performance_stats['avg_latency'], 2),
        "min_latency_ms": round(performance_stats['min_latency'], 2),
        "max_latency_ms": round(performance_stats['max_latency'], 2),
        "cache_size": len(frame_cache),
        "max_cache_size": CACHE_SIZE,
        "active_sessions": len(session_analyzers),
        "session_ids": list(session_analyzers.keys())
    }

@app.get("/debug_sessions")
async def debug_sessions():
    """Debug endpoint to see active sessions and their data"""
    return {
        "active_sessions": len(session_analyzers),
        "session_analyzers": list(session_analyzers.keys()),
        "session_trajectories": list(session_trajectories.keys()),
        "session_details": {
            session_id: {
                "active_trajectories": len(analyzer.active_trajectories),
                "completed_trajectories": len(analyzer.completed_trajectories),
                "has_center_line": analyzer.center_line is not None
            }
            for session_id, analyzer in session_analyzers.items()
        }
    }

@app.get("/optimize")
async def optimize_settings():
    """Dynamic optimization based on current performance"""
    cache_hit_rate = (performance_stats['cache_hits'] / max(performance_stats['total_requests'], 1)) * 100
    
    recommendations = []
    
    if performance_stats['avg_latency'] > 100:  # If latency > 100ms
        recommendations.append("Consider using /detect_fast endpoint for lower latency")
    
    if cache_hit_rate < 30:
        recommendations.append("Low cache hit rate - consider increasing cache size")
    
    if performance_stats['avg_latency'] > 200:
        recommendations.append("High latency detected - enable async processing")
    
    return {
        "current_performance": performance_stats,
        "recommendations": recommendations,
        "optimal_endpoint": "/detect_fast" if performance_stats['avg_latency'] > 100 else "/detect"
    }

@app.post("/analyze_trajectory")
async def analyze_trajectory(req: TrajectoryAnalysisReq):
    """Process detections for trajectory analysis and arc classification"""
    try:
        # Get session-specific analyzer
        session_analyzer = get_session_analyzer(req.session_id)
        
        # Process detections and update trajectories
        analysis_result = session_analyzer.process_detections(
            req.detections, req.frame_index, req.timestamp
        )
        
        # Force complete trajectories that have enough points for analysis
        session_analyzer.force_complete_long_trajectories(min_points=3)
        
        # Get session-specific trajectories
        if req.session_id not in session_trajectories:
            session_trajectories[req.session_id] = {
                'active_trajectories': [],
                'completed_trajectories': [],
                'center_line': None
            }
        
        # Update session data
        session_trajectories[req.session_id]['active_trajectories'] = list(session_analyzer.active_trajectories.values())
        session_trajectories[req.session_id]['completed_trajectories'] = session_analyzer.completed_trajectories
        session_trajectories[req.session_id]['center_line'] = session_analyzer.center_line
        
        # Classify arcs for completed trajectories
        arc_classifications = []
        for trajectory in session_analyzer.completed_trajectories:
            if len(trajectory.points) >= 3:  # Minimum points for classification
                classification = arc_classifier.classify_arc(trajectory)
                arc_classifications.append({
                    'trajectory_id': trajectory.trajectory_id,
                    'arc_type': classification.arc_type.value,
                    'confidence': classification.confidence,
                    'reasoning': classification.reasoning,
                    'trajectory_stats': {
                        'duration': trajectory.duration,
                        'total_distance': trajectory.total_distance,
                        'avg_speed': trajectory.avg_speed,
                        'max_speed': trajectory.max_speed,
                        'point_count': len(trajectory.points)
                    }
                })
        
        return {
            "success": True,
            "session_id": req.session_id,
            "analysis_result": analysis_result,
            "arc_classifications": arc_classifications,
            "center_line": session_analyzer.center_line.__dict__ if session_analyzer.center_line else None
        }
    
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/set_center_line")
async def set_center_line(req: CenterLineReq):
    """Manually set center line for trajectory analysis"""
    try:
        # Calculate angle and length
        dx = req.end_x - req.start_x
        dy = req.end_y - req.start_y
        angle = math.atan2(dy, dx)
        length = math.sqrt(dx**2 + dy**2)
        
        # Create center line
        center_line = CenterLine(
            start_x=req.start_x,
            start_y=req.start_y,
            end_x=req.end_x,
            end_y=req.end_y,
            angle=angle,
            length=length
        )
        
        # Update session-specific analyzer
        session_analyzer = get_session_analyzer(req.session_id)
        session_analyzer.center_line = center_line
        
        # Update session data
        if req.session_id not in session_trajectories:
            session_trajectories[req.session_id] = {
                'active_trajectories': [],
                'completed_trajectories': [],
                'center_line': None
            }
        
        session_trajectories[req.session_id]['center_line'] = center_line
        
        return {
            "success": True,
            "session_id": req.session_id,
            "center_line": center_line.__dict__
        }
    
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/get_trajectory_summary/{session_id}")
async def get_trajectory_summary(session_id: str):
    """Get comprehensive trajectory summary for a session"""
    try:
        if session_id not in session_trajectories:
            return {"success": False, "error": "Session not found"}
        
        session_data = session_trajectories[session_id]
        
        # Analyze all trajectories relative to center line
        trajectory_analyses = []
        session_analyzer = get_session_analyzer(session_id)
        for trajectory in session_data['completed_trajectories']:
            if session_analyzer.center_line:
                analysis = session_analyzer.analyze_trajectory_relative_to_center_line(trajectory)
                trajectory_analyses.append({
                    'trajectory_id': trajectory.trajectory_id,
                    'analysis': analysis,
                    'trajectory_stats': {
                        'duration': trajectory.duration,
                        'total_distance': trajectory.total_distance,
                        'avg_speed': trajectory.avg_speed,
                        'max_speed': trajectory.max_speed,
                        'point_count': len(trajectory.points)
                    }
                })
        
        # Calculate session statistics
        total_trajectories = len(session_data['completed_trajectories'])
        total_distance = sum(t.total_distance for t in session_data['completed_trajectories'])
        avg_speed = sum(t.avg_speed for t in session_data['completed_trajectories']) / max(total_trajectories, 1)
        
        return {
            "success": True,
            "session_id": session_id,
            "summary": {
                "total_trajectories": total_trajectories,
                "total_distance": total_distance,
                "average_speed": avg_speed,
                "center_line": session_data['center_line'].__dict__ if session_data['center_line'] else None
            },
            "trajectory_analyses": trajectory_analyses
        }
    
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.delete("/clear_trajectory_session/{session_id}")
async def clear_trajectory_session(session_id: str):
    """Clear all trajectory data for a session"""
    try:
        clear_session_data(session_id)
        return {"success": True, "message": f"Session {session_id} cleared"}
    
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/clear_session_data")
async def clear_session_data_endpoint(session_id: str = Form(...)):
    """Clear all session data - called when new video is uploaded"""
    try:
        clear_session_data(session_id)
        return {"success": True, "message": f"Session {session_id} data cleared"}
    
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.post("/classify_arc")
async def classify_arc(req: TrajectoryReq):
    """Legacy endpoint - now uses the new trajectory analysis system"""
    try:
        # Convert points to trajectory format
        if len(req.points) < 3:
            return {"success": False, "error": "Need at least 3 points for classification"}
        
        # Create trajectory points
        trajectory_points = []
        for i, point in enumerate(req.points):
            if len(point) >= 2:
                trajectory_points.append(TrajectoryPoint(
                    x=point[0],
                    y=point[1],
                    frame_index=i,
                    timestamp=time.time() + i * 0.033,  # Assume 30fps
                    confidence=1.0
                ))
        
        # Create temporary trajectory
        temp_trajectory = Trajectory(
            trajectory_id="temp_classification",
            points=trajectory_points,
            class_id=0,
            start_frame=0,
            end_frame=len(trajectory_points) - 1,
            duration=0.0,
            total_distance=0.0,
            avg_speed=0.0,
            max_speed=0.0
        )
        
        # Classify using the new system
        classification = arc_classifier.classify_arc(temp_trajectory)
        
        return {
            "success": True,
            "arc_type": classification.arc_type.value,
            "confidence": classification.confidence,
            "reasoning": classification.reasoning
        }
    
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
