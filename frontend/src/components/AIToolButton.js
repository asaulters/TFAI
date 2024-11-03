import React, { useState } from 'react';
import './AIToolButton.css';

const AIToolButton = ({ tool }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="ai-tool-button">
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <button onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="tool-details">
          <p>{tool.details}</p>
          {/* Add more details here as needed */}
        </div>
      )}
    </div>
  );
};

export default AIToolButton;
