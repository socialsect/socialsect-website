import React from 'react';

const stats = [
  { number: '10,000+', label: 'Consultations booked for clients' },
  { number: '$10M+',   label: 'Patient pipeline generated' },
  { number: '4.2×',   label: 'Average client ROI' },
  { number: '70%',    label: 'Consultation-to-surgery rate' },
];

export default function StatsViz() {
  return (
    <div className="stats-grid">
      {stats.map(({ number, label }) => (
        <div className="stat-item" key={label}>
          <div className="stat-number">{number}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>
  );
}