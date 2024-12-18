import React from 'react';
import './AIToolsDisplay.css';

const AIToolModal = ({ tool, onClose }) => {
  return (
    <div className="tool-modal-overlay" onClick={onClose}>
      <div className="tool-modal-content" onClick={e => e.stopPropagation()}>
        <h2>{tool.name}</h2>
        <p className="overview">{tool.overview}</p>
        
        <h3>Key Features</h3>
        <ul>
          {tool.keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <h3>Benefits</h3>
        <ul>
          {tool.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>

        <h3>Common Use Cases</h3>
        <ul>
          {tool.commonUseCases.map((useCase, index) => (
            <li key={index}>{useCase}</li>
          ))}
        </ul>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AIToolModal;
