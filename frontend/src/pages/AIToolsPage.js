import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ToolCard from '../components/tools/ToolCard';
import ToolModal from '../components/tools/ToolModal';
import aiTools from '../data/aiTools.json';
import automationTools from '../data/automationTools.json';
import './AIToolsPage.css';

const AIToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Changed to null for no initial selection
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const toolParam = searchParams.get('tool');
    if (toolParam) {
      const allTools = [...aiTools.tools, ...automationTools.tools];
      const tool = allTools.find(t => t.name.toLowerCase() === toolParam.toLowerCase());
      if (tool) {
        setSelectedTool(tool);
        const element = document.getElementById(`tool-${toolParam.toLowerCase()}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [searchParams]);

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const getDisplayedTools = () => {
    if (!selectedCategory) return [];
    return selectedCategory === 'AI Tools' ? aiTools.tools : automationTools.tools;
  };

  return (
    <div className="ai-tools-page">
      <section className="hero">
        <div className="container">
          <h1>The Best Tools to Streamline Your Business</h1>
          <div className="cta-buttons">
            <button 
              className={`cta-button ${selectedCategory === 'Automation Tools' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('Automation Tools')}
            >
              Automation Tools
            </button>
            <button 
              className={`cta-button ${selectedCategory === 'AI Tools' ? 'active' : ''}`}
              onClick={() => handleCategorySelect('AI Tools')}
            >
              AI Tools
            </button>
          </div>
        </div>
      </section>

      <section className="tools-grid">
        <div className="container">
          <div className="tools-wrapper">
            {!selectedCategory ? (
              <div className="no-selection-message">
                Choose tool type above!
              </div>
            ) : (
              getDisplayedTools().map((tool, index) => (
                <div
                  id={`tool-${tool.name.toLowerCase()}`}
                  key={index}
                >
                  <ToolCard
                    tool={tool}
                    onClick={() => handleToolClick(tool)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {selectedTool && (
        <ToolModal
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
};

export default AIToolsPage;
