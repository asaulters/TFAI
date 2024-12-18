import React from 'react';
import './ToolModal.css';

const ToolModal = ({ tool, onClose }) => {
  const handleVisitWebsite = () => {
    if (tool.website) {
      window.open(tool.website, '_blank');
    }
  };

  return (
    <div className="tool-modal-overlay" onClick={onClose}>
      <div className="tool-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="tool-modal-header">
          <img src={tool.logo} alt={tool.name} className="tool-modal-icon" />
          <div className="tool-modal-title">
            <h2>{tool.name}</h2>
          </div>
        </div>

        <div className="tool-modal-body">
          <section className="overview-section">
            <h3>Overview</h3>
            <p>{tool.overview}</p>
          </section>

          <section className="features-section">
            <h3>Key Features</h3>
            <ul>
              {tool.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="benefits-section">
            <h3>Benefits</h3>
            <ul>
              {tool.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="use-cases-section">
            <h3>Common Use Cases</h3>
            <ul>
              {tool.commonUseCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </section>

          <div className="modal-actions">
            <button 
              className="visit-website-button"
              onClick={handleVisitWebsite}
            >
              Visit Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolModal;
