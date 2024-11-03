import React from 'react';
import './ToolModal.css';

const ToolModal = ({ tool, onClose }) => {
  return (
    <div className="tool-modal-overlay" onClick={onClose}>
      <div className="tool-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="tool-modal-header">
          <img src={tool.icon} alt={tool.name} className="tool-modal-icon" />
          <div className="tool-modal-title">
            <h2>{tool.name}</h2>
            <div className="tool-modal-category">{tool.category}</div>
          </div>
        </div>

        <div className="tool-modal-body">
          <section className="overview-section">
            <h3>Overview</h3>
            <p>{tool.details.overview}</p>
          </section>

          <section className="features-section">
            <h3>Key Features</h3>
            <ul>
              {tool.details.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="use-cases-section">
            <h3>Use Cases</h3>
            <ul>
              {tool.details.useCases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </section>

          <section className="pricing-section">
            <h3>Pricing</h3>
            <div className="pricing-grid">
              {Object.entries(tool.details.pricing).map(([plan, price]) => (
                <div key={plan} className="pricing-item">
                  <strong>{price}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="pros-cons-section">
            <div className="pros">
              <h3>Pros</h3>
              <ul>
                {tool.details.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>
            <div className="cons">
              <h3>Cons</h3>
              <ul>
                {tool.details.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ToolModal;