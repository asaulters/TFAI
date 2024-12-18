import React from 'react';
import './ToolCard.css';

const ToolCard = ({ tool, onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    onClick();
  };

  return (
    <div className="tool-card" onClick={onClick}>
      <div className="tool-icon">
        <img src={tool.logo} alt={tool.name} />
      </div>
      <div className="tool-content">
        <h3>{tool.name}</h3>
        <p>{tool.overview}</p>
      </div>
      <button 
        className="sign-up-button" 
        onClick={handleClick}
      >
        Learn More
      </button>
    </div>
  );
};

export default ToolCard;
