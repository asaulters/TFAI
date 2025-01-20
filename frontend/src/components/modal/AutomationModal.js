import React, { useState } from 'react';
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

  const navigate = useNavigate();

  if (!automation) return null;

  const createToolLink = (toolName) => {
    const toolsMap = {
      'Zapier': 'zapier',
      'Make': 'make',
      'Airtable': 'airtable',
      'Twilio': 'twilio',
      'Mailchimp': 'mailchimp',
      'Asana': 'asana',
      'SurveyMonkey': 'surveymonkey',
      'Typeform': 'typeform',
      'JotForm': 'jotform',
      'Slack': 'slack',
      'ChatGPT': 'chatgpt',
      'Canva': 'canva',
      'Buffer': 'buffer',
      'Calendly': 'calendly',
      'Trello': 'trello',
      'MidJourney': 'midjourney',
      'HubSpot': 'hubspot',
      'Google Drive': 'google-drive',
      'Dropbox': 'dropbox',
      'Google Analytics': 'google-analytics',
      'Git': 'git',
      'ApproveMe': 'approveme',
      'Monday': 'monday',
      'ClickUp': 'clickup',
      'Microsoft Teams': 'microsoft-teams',
      'Notion': 'notion',
      'Zoom': 'zoom',
      'DocuSign': 'docusign',
      'QuickBooks': 'quickbooks',
      'Xero': 'xero',
      'Stripe': 'stripe',
      'PayPal': 'paypal',
      'Square': 'square',
      'WordPress': 'wordpress',
      'Shopify': 'shopify',
      'WooCommerce': 'woocommerce'
    };
    
    const normalizedToolName = Object.keys(toolsMap).find(
      key => key.toLowerCase() === toolName.trim().toLowerCase()
    );
    
    if (normalizedToolName) {
      return (
        <span
          key={normalizedToolName}
          className="tool-link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/ai-tools?tool=${toolsMap[normalizedToolName]}`);
            onClose();
          }}
        >
          {normalizedToolName}
        </span>
      );
    }
    return toolName;
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>{automation.title}</h2>
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

          <div className="download-section">
            <input
              type="text"
              className="name-input"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              disabled={loading}
            />
            <input
              type="email"
              className="email-input"
              placeholder="Enter Email for PDF"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={loading}
            />
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}
            {pdfLink ? (
              <a 
                href={pdfLink}
                className="download-pdf-btn success"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download PDF
              </a>
            ) : (
              <button 
                className="download-pdf-btn"
                onClick={handleDownload}
                disabled={loading || !name || !email || !isValidEmail(email)}
              >
                {loading ? 'Processing...' : 'Download PDF Walkthrough'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationModal;
