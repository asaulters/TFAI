// frontend/src/components/tools/AIToolsDisplay.js

import React, { useState } from 'react';
import automationTools from '../../data/automationTools.json';
import productivityTools from '../../data/aiTools.json';
import './AIToolsDisplay.css';

const AIToolsDisplay = () => {
  console.log('AIToolsDisplay component rendering');
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const getActiveTools = () => {
    if (!activeCategory) return [];
    return activeCategory === 'automation' ? automationTools.tools : productivityTools.tools;
  };

  const ToolModal = ({ tool, onClose }) => (
    <div className="tool-modal-overlay" onClick={onClose}>
      <div className="tool-modal-content" onClick={e => e.stopPropagation()}>
        <img src={tool.logo} alt={`${tool.name} Logo`} className="tool-logo" />
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

        <div className="modal-buttons">
          <a 
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="website-button"
          >
            Visit Website
          </a>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ai-tools-container">
      <h1>Tools & Resources</h1>
      
      <div className="category-buttons">
        <button 
          className={`category-button ${activeCategory === 'automation' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('automation')}
        >
          Tools We Use
        </button>
        <button 
          className={`category-button ${activeCategory === 'productivity' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('productivity')}
        >
          Recommended Tools
        </button>
      </div>

      {activeCategory && (
        <div className="tools-grid">
          {getActiveTools().map((tool, index) => (
            <div 
              key={index} 
              className="tool-card"
              onClick={() => setSelectedTool(tool)}
            >
              <img 
                src={tool.logo} 
                alt={`${tool.name} Logo`} 
                className="tool-logo"
              />
              <h3>{tool.name}</h3>
              <p>{tool.overview.substring(0, 150)}...</p>
            </div>
          ))}
        </div>
      )}

      {selectedTool && (
        <ToolModal 
          tool={selectedTool} 
          onClose={() => setSelectedTool(null)} 
        />
      )}
    </div>
  );
};

export default AIToolsDisplay;
