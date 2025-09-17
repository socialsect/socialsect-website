#!/usr/bin/env python3
"""
Performance testing script for video object detection optimization
"""
import time
import requests
import base64
import cv2
import numpy as np
from concurrent.futures import ThreadPoolExecutor
import statistics

class PerformanceTester:
    def __init__(self, base_url="http://localhost:8000"):
        self.base_url = base_url
        self.test_frames = []
        
    def generate_test_frames(self, num_frames=10, size=(640, 640)):
        """Generate test frames for performance testing"""
        print(f"Generating {num_frames} test frames...")
        
        for i in range(num_frames):
            # Create a test frame with some random content
            frame = np.random.randint(0, 255, (size[1], size[0], 3), dtype=np.uint8)
            
            # Add some geometric shapes to make detection more realistic
            cv2.rectangle(frame, (100, 100), (200, 200), (0, 255, 0), 2)
            cv2.circle(frame, (400, 300), 50, (255, 0, 0), 2)
            cv2.putText(frame, f"Frame {i}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            
            # Encode as JPEG
            _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
            frame_base64 = base64.b64encode(buffer).decode()
            self.test_frames.append(frame_base64)
        
        print(f"Generated {len(self.test_frames)} test frames")
    
    def test_single_frame_performance(self, num_tests=5):
        """Test single frame processing performance"""
        print("\n=== Single Frame Performance Test ===")
        
        times = []
        for i in range(num_tests):
            frame_data = self.test_frames[i % len(self.test_frames)]
            
            # Convert base64 to bytes for file upload
            frame_bytes = base64.b64decode(frame_data)
            
            start_time = time.time()
            try:
                response = requests.post(
                    f"{self.base_url}/detect",
                    files={"file": ("test.jpg", frame_bytes, "image/jpeg")},
                    data={"session_id": f"test_{i}"}
                )
                end_time = time.time()
                
                if response.status_code == 200:
                    result = response.json()
                    processing_time = result.get('processing_time', (end_time - start_time) * 1000)
                    times.append(processing_time)
                    print(f"Test {i+1}: {processing_time:.3f}ms")
                else:
                    print(f"Test {i+1}: Failed with status {response.status_code}")
                    
            except Exception as e:
                print(f"Test {i+1}: Error - {e}")
        
        if times:
            avg_time = statistics.mean(times)
            min_time = min(times)
            max_time = max(times)
            std_dev = statistics.stdev(times) if len(times) > 1 else 0
            
            print(f"\nSingle Frame Results:")
            print(f"  Average: {avg_time:.3f}ms")
            print(f"  Min: {min_time:.3f}ms")
            print(f"  Max: {max_time:.3f}ms")
            print(f"  Std Dev: {std_dev:.3f}ms")
            print(f"  FPS: {1000/avg_time:.2f}")
            
            return avg_time
        return None
    
    def test_batch_performance(self, batch_sizes=[1, 4, 8, 16], num_tests=3):
        """Test batch processing performance"""
        print("\n=== Batch Processing Performance Test ===")
        
        results = {}
        
        for batch_size in batch_sizes:
            print(f"\nTesting batch size: {batch_size}")
            batch_times = []
            
            for test in range(num_tests):
                # Prepare batch frames
                batch_frames = self.test_frames[:batch_size]
                
                start_time = time.time()
                try:
                    response = requests.post(
                        f"{self.base_url}/detect_batch",
                        json={
                            "frames": batch_frames,
                            "session_id": f"batch_test_{batch_size}_{test}"
                        }
                    )
                    end_time = time.time()
                    
                    if response.status_code == 200:
                        result = response.json()
                        processing_time = result.get('processing_time', (end_time - start_time) * 1000)
                        fps = result.get('fps', batch_size / (processing_time / 1000))
                        
                        batch_times.append(processing_time)
                        print(f"  Test {test+1}: {processing_time:.3f}ms ({fps:.2f} FPS)")
                    else:
                        print(f"  Test {test+1}: Failed with status {response.status_code}")
                        
                except Exception as e:
                    print(f"  Test {test+1}: Error - {e}")
            
            if batch_times:
                avg_time = statistics.mean(batch_times)
                avg_fps = batch_size / (avg_time / 1000)
                results[batch_size] = {
                    'avg_time': avg_time,
                    'avg_fps': avg_fps,
                    'efficiency': avg_fps / batch_size
                }
                
                print(f"  Batch {batch_size} - Avg: {avg_time:.3f}ms, FPS: {avg_fps:.2f}")
        
        return results
    
    def test_concurrent_performance(self, num_concurrent=5, num_requests=10):
        """Test concurrent request performance"""
        print(f"\n=== Concurrent Performance Test ({num_concurrent} concurrent) ===")
        
        def make_request(request_id):
            frame_data = self.test_frames[request_id % len(self.test_frames)]
            frame_bytes = base64.b64decode(frame_data)
            
            start_time = time.time()
            try:
                response = requests.post(
                    f"{self.base_url}/detect",
                    files={"file": (f"test_{request_id}.jpg", frame_bytes, "image/jpeg")},
                    data={"session_id": f"concurrent_{request_id}"}
                )
                end_time = time.time()
                
                if response.status_code == 200:
                    return end_time - start_time
                else:
                    return None
            except Exception as e:
                print(f"Request {request_id} failed: {e}")
                return None
        
        start_time = time.time()
        
        with ThreadPoolExecutor(max_workers=num_concurrent) as executor:
            futures = [executor.submit(make_request, i) for i in range(num_requests)]
            times = [future.result() for future in futures if future.result() is not None]
        
        total_time = time.time() - start_time
        
        if times:
            avg_time = statistics.mean(times)
            total_throughput = len(times) / total_time
            
            print(f"Concurrent Results:")
            print(f"  Total time: {total_time:.3f}s")
            print(f"  Successful requests: {len(times)}/{num_requests}")
            print(f"  Average request time: {avg_time:.3f}s")
            print(f"  Total throughput: {total_throughput:.2f} requests/second")
            
            return total_throughput
        return None
    
    def run_full_test_suite(self):
        """Run complete performance test suite"""
        print("🚀 Starting Performance Test Suite")
        print("=" * 50)
        
        # Generate test frames
        self.generate_test_frames(num_frames=20)
        
        # Test single frame performance
        single_avg = self.test_single_frame_performance(num_tests=10)
        
        # Test batch performance
        batch_results = self.test_batch_performance(batch_sizes=[1, 4, 8, 16], num_tests=3)
        
        # Test concurrent performance
        concurrent_throughput = self.test_concurrent_performance(num_concurrent=5, num_requests=20)
        
        # Summary
        print("\n" + "=" * 50)
        print("📊 PERFORMANCE SUMMARY")
        print("=" * 50)
        
        if single_avg:
            print(f"Single Frame Processing: {single_avg:.3f}ms ({1000/single_avg:.2f} FPS)")
        
        if batch_results:
            print("\nBatch Processing Results:")
            for batch_size, result in batch_results.items():
                print(f"  Batch {batch_size}: {result['avg_fps']:.2f} FPS (Efficiency: {result['efficiency']:.2f})")
        
        if concurrent_throughput:
            print(f"\nConcurrent Throughput: {concurrent_throughput:.2f} requests/second")
        
        print("\n✅ Performance testing completed!")

if __name__ == "__main__":
    import sys
    
    base_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000"
    tester = PerformanceTester(base_url)
    tester.run_full_test_suite()
