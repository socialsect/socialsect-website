'use client'

import React, { useState, useEffect, useRef } from 'react';
import './ResultsPieChart.css';

const SEGMENTS = [
  { label: 'Revenue Generated', value: '$2.2M+', color: '#695AF2', percent: 38 },
  { label: 'Consultations Booked', value: '1,100+', color: '#1A1C1D', percent: 28 },
  { label: 'Ad Spend Managed', value: '$100K+', color: '#A9A6E5', percent: 20 },
  { label: 'Leads Generated', value: '7,400+', color: '#E2E2E2', percent: 14 },
];

export default function ResultsPieChart() {
  const [animated, setAnimated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const total = SEGMENTS.reduce((sum, s) => sum + s.percent, 0);
  let cumulative = 0;
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 100;

  const slices = SEGMENTS.map((seg) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += seg.percent;
    const endAngle = (cumulative / total) * 360;
    const midAngle = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArc = seg.percent > 50 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const tooltipX = cx + (radius + 24) * Math.cos(midAngle);
    const tooltipY = cy + (radius + 24) * Math.sin(midAngle);

    return { ...seg, d, index: SEGMENTS.indexOf(seg), tooltipX, tooltipY };
  });

  const handleSliceHover = (slice) => {
    setHoveredIndex(slice.index);
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = rect.width / size;
      const scaleY = rect.height / size;
      setTooltipPos({
        x: slice.tooltipX * scaleX,
        y: slice.tooltipY * scaleY,
      });
    }
  };

  return (
    <div className="results-pie" ref={ref}>
      <p className="results-pie__title">
        <span className="results-pie__title-value">$2.2M+</span>
        <span className="results-pie__title-label">Revenue Generated</span>
      </p>

      <div className="results-pie__chart-wrap">
        <svg
          ref={svgRef}
          className="results-pie__svg"
          viewBox={`0 0 ${size} ${size}`}
          aria-label="Results pie chart showing key metrics"
        >
          {slices.map((slice) => (
            <path
              key={slice.label}
              className={`results-pie__slice${animated ? ' results-pie__slice--animated' : ''}${hoveredIndex === slice.index ? ' results-pie__slice--hovered' : ''}`}
              d={slice.d}
              fill={slice.color}
              onMouseEnter={() => handleSliceHover(slice)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </svg>

        {hoveredIndex !== null && (
          <div
            className="results-pie__tooltip"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
            }}
          >
            <span className="results-pie__tooltip-dot" style={{ background: SEGMENTS[hoveredIndex].color }} />
            <span className="results-pie__tooltip-label">{SEGMENTS[hoveredIndex].label}</span>
            <span className="results-pie__tooltip-value">{SEGMENTS[hoveredIndex].value}</span>
          </div>
        )}
      </div>

      <div className="results-pie__legend">
        {SEGMENTS.map((seg, i) => (
          <div
            key={seg.label}
            className={`results-pie__legend-item${hoveredIndex === i ? ' results-pie__legend-item--active' : ''}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="results-pie__legend-dot" style={{ background: seg.color }} />
            <span className="results-pie__legend-label">{seg.label}</span>
            <span className="results-pie__legend-value">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
