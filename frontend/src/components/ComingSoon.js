import React from 'react';
import './ComingSoon.css';

const ComingSoon = () => {
  const upcomingFeatures = [
    { name: 'Video Walkthroughs', description: 'Step-by-step video guides to help you set up and use our features.' },
    { name: 'Custom Workflow Builder', description: 'Create and automate custom workflows tailored to your business needs.' },
  ];

  return (
    <div className="coming-soon">
      <h2>Coming Soon</h2>
      <div className="feature-grid">
        {upcomingFeatures.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              <span className="icon-placeholder">●</span>
            </div>
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;
