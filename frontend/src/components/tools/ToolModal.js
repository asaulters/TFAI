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
            {tool.complexity && (
              <div className="complexity-info">
                <strong>Complexity:</strong> {tool.complexity}
              </div>
            )}
            {tool.paidOrFree && (
              <div className="pricing-info">
                <strong>Pricing:</strong> {tool.paidOrFree}
              </div>
            )}
          </section>

          {tool.prosCons && (
            <section className="pros-cons-section">
              <h3>Pros & Cons</h3>
              <div className="pros-cons-container">
                <div className="pros">
                  <h4>Pros</h4>
                  <ul>
                    {tool.prosCons.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h4>Cons</h4>
                  <ul>
                    {tool.prosCons.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          <section className="features-benefits-section">
            <h3>Key Features & Benefits</h3>
            <div className="features-benefits-container">
              <div className="features">
                <h4>Key Features</h4>
                <ul>
                  {tool.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="benefits">
                <h4>Benefits</h4>
                <ul>
                  {tool.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
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
