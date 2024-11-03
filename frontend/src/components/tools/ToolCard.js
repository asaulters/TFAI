import React from 'react';
import './ToolCard.css';

const ToolCard = ({ tool, onClick }) => {
  const handleSignUp = () => {
    if (tool.details.registrationUrl) {
      window.open(tool.details.registrationUrl, '_blank');
    }
  };

  return (
    <div className="tool-card" onClick={onClick}>
      <div className="tool-icon">
        <img src={tool.icon} alt={tool.name} />
      </div>
      <div className="tool-content">
        <h3>{tool.name}</h3>
        <div className="tool-category">{tool.category}</div>
        <p>{tool.description}</p>
      </div>
      <button 
        className="sign-up-button" 
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default ToolCard;