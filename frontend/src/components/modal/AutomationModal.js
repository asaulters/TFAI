import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AutomationModal.css';

const AutomationModal = ({ automation, onClose }) => {
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
      'MidJourney': 'midjourney'
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
            <p className="description">{automation.description}</p>
            
            {automation.difficulty && (
              <div className="difficulty-level">
                <strong>Difficulty:</strong> {automation.difficulty}
              </div>
            )}

            {automation.setupTime && (
              <div className="setup-time">
                <strong>Setup Time:</strong> {automation.setupTime}
              </div>
            )}

            {automation.costEstimate && (
              <div className="cost-estimate">
                <strong>Cost Estimate:</strong> {automation.costEstimate}
              </div>
            )}
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
        </div>
      </div>
    </div>
  );
};

export default AutomationModal;
