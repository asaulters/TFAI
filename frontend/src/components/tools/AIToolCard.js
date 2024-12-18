import React from 'react';
import './AIToolsDisplay.css';

const AIToolCard = ({ tool, onClick }) => {
  return (
    <div className="tool-card" onClick={() => onClick(tool)}>
      <h3>{tool.name}</h3>
      <p>{tool.overview.substring(0, 150)}...</p>
      
    </div>
  );
};

export default AIToolCard;
