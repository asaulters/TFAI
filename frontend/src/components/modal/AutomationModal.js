import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '../video/VideoPlayer';
import './AutomationModal.css';

const AutomationModal = ({ automation, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [pdfLink, setPdfLink] = useState('');
  
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleDownload = async () => {
    if (!name || !email || !isValidEmail(email)) return;
    
    setLoading(true);
    setStatus({ type: '', message: '' });
    setPdfLink('');

    try {
      const response = await fetch('http://localhost:5001/api/email/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: name,
          email: email,
          category: automation.category
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe to mailing list');
      }

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Successfully subscribed! Your PDF is ready.'
        });
        setPdfLink(data.pdfLink);
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Something went wrong'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Failed to process your request'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle ESC key to close modal
  const handleEscKey = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey);
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [handleEscKey]);

  const navigate = useNavigate();

  if (!automation) return null;

  const createToolLink = (toolName) => {
    // Normalize the tool name
    const normalizedName = toolName.trim();
    
    // Special case for HubSpot variations
    const isHubSpot = normalizedName.toLowerCase().replace(/\s+/g, '') === 'hubspot';
    
    // Check if tool exists in automationTools.json
    try {
      const allTools = require('../../data/automationTools.json').tools;
      const toolExists = allTools.some(
        tool => tool.name.toLowerCase().replace(/\s+/g, '') === normalizedName.toLowerCase().replace(/\s+/g, '')
      );
      
      if (toolExists || isHubSpot) {
        return (
          <span
            key={toolName}
            className="tool-link"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ai-tools?tool=${toolName}`);
              onClose();
            }}
          >
            {toolName}
          </span>
        );
      }
    } catch (error) {
      console.error('Error checking tool existence:', error);
    }
    
    return <span>{toolName}</span>;
  };

  const renderToolsList = (toolsArray) => {
    if (!toolsArray) return null;
    
    return toolsArray.map((tool, index) => (
      <React.Fragment key={index}>
        {createToolLink(tool)}
        {index < toolsArray.length - 1 ? ', ' : ''}
      </React.Fragment>
    ));
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "${automation.title}",
              "description": "${automation.overview}",
              "category": "${automation.category}",
              "step": ${JSON.stringify(automation.steps.map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": step.title,
                "text": step.description
              })))},
              "tool": ${JSON.stringify(automation.tools)},
              "supply": ${JSON.stringify(automation.prerequisites || [])},
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "category": "${automation.paidOrFree || 'Variable'}"
              }
            }
          `}
        </script>
      </Helmet>

      <div 
        className="modal-overlay" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div 
          className="modal-content" 
          onClick={e => e.stopPropagation()}
          role="document"
        >
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        
          <div className="modal-header">
            <h2 id="modal-title">{automation.title}</h2>
            <div className="category-tag">{automation.category}</div>
          </div>

          <div className="modal-body">
            <div className="overview-section">
            <p className="description">{automation.overview}</p>
            
            {automation.complexity && (
              <div className="complexity-level">
                <strong>Complexity:</strong> {automation.complexity}
              </div>
            )}

            {automation.paidOrFree && (
              <div className="pricing-info">
                <strong>Pricing:</strong> {automation.paidOrFree}
              </div>
            )}
          </div>

          {automation.keyFeatures && (
            <div className="key-features-section">
              <h3>Key Features</h3>
              <ul>
                {automation.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {automation.prosCons && (
            <div className="pros-cons-section">
              <h3>Pros & Cons</h3>
              <div className="pros-cons-container">
                <div className="pros">
                  <h4>Pros</h4>
                  <ul>
                    {automation.prosCons.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h4>Cons</h4>
                  <ul>
                    {automation.prosCons.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {automation.commonUseCases && (
            <div className="use-cases-section">
              <h3>Common Use Cases</h3>
              <ul>
                {automation.commonUseCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="video-section">
            <h3>Video Walkthrough</h3>
            <VideoPlayer videoUrl={automation.video_walkthrough} />
          </div>

          {automation.tools && automation.tools.length > 0 && (
            <div className="tools-used-section">
              <h3>Tools Used</h3>
              <div className="tools-list">
                {automation.tools.map((tool, index) => (
                  <div key={index} className="tool-tag">
                    {createToolLink(tool)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {automation.prerequisites && (
            <div className="prerequisites-section">
              <h3>Prerequisites</h3>
              <ul>
                {automation.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="steps-section">
            <h3>Steps</h3>
            <ol>
              {automation.steps.map((step, index) => (
                <li key={index}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  {step.tools && step.tools.length > 0 && (
                    <div className="step-tools">
                      <strong>Tools: </strong>
                      {renderToolsList(step.tools)}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {automation.benefits && (
            <div className="benefits-section">
              <h3>Benefits</h3>
              <ul>
                {automation.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {automation.considerations && (
            <div className="considerations-section">
              <h3>Considerations</h3>
              <ul>
                {automation.considerations.map((consideration, index) => (
                  <li key={index}>{consideration}</li>
                ))}
              </ul>
            </div>
          )}

          {automation.maintenanceNeeds && (
            <div className="maintenance-section">
              <h3>Maintenance Needs</h3>
              <p>{automation.maintenanceNeeds}</p>
            </div>
          )}

          <div className="download-section" role="form" aria-label="Download PDF form">
            <div className="form-field">
              <label htmlFor="name" className="visually-hidden">Name</label>
              <input
                type="text"
                id="name"
                className="name-input"
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={loading}
                required
                aria-required="true"
                minLength="2"
                maxLength="50"
              />
            </div>
            <div className="form-field">
              <label htmlFor="email" className="visually-hidden">Email</label>
              <input
                type="email"
                id="email"
                className="email-input"
                placeholder="Enter Email for PDF"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={loading}
                required
                aria-required="true"
                aria-invalid={email && !isValidEmail(email)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
              {email && !isValidEmail(email) && (
                <span className="error-message" role="alert">
                  Please enter a valid email address
                </span>
              )}
            </div>
            {status.message && (
              <div 
                className={`status-message ${status.type}`}
                role="alert"
                aria-live={status.type === 'error' ? 'assertive' : 'polite'}
              >
                {status.message}
              </div>
            )}
            {pdfLink ? (
              <a 
                href={pdfLink}
                className="download-pdf-btn success"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download PDF walkthrough"
              >
                Download PDF
              </a>
            ) : (
              <button 
                className="download-pdf-btn"
                onClick={handleDownload}
                disabled={loading || !name || !email || !isValidEmail(email)}
                aria-busy={loading}
              >
                <span className="button-text">
                  {loading ? 'Processing...' : 'Download PDF Walkthrough'}
                </span>
                {loading && (
                  <span className="loading-spinner" aria-hidden="true" />
                )}
              </button>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutomationModal;
