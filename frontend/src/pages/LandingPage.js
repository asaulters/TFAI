import React, { useState, useRef } from 'react';
import CategorySelector from '../components/category/CategorySelector';
import TaskDisplay from '../components/category/TaskDisplay';
import ComingSoon from '../components/ComingSoon';
import ContactForm from '../components/ContactForm';
import AutomationModal from '../components/modal/AutomationModal';
import './LandingPage.css';

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAutomation, setSelectedAutomation] = useState(null);
  const businessSectionRef = useRef(null);

  const handleCategorySelect = async (categoryData) => {
    setSelectedCategory(categoryData);
  };

  const handleAutomationClick = (automation) => {
    setSelectedAutomation(automation);
  };

  const handleCloseModal = () => {
    setSelectedAutomation(null);
  };

  const scrollToBusinessSection = () => {
    businessSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container">
          <h1>Streamline Your Business with AI</h1>
          <p>Discover automated solutions for small and medium-sized businesses</p>
          <button className="cta-button" onClick={scrollToBusinessSection}>Explore Solutions</button>
        </div>
      </section>

      <section className="business-selection" ref={businessSectionRef}>
        <div className="container">
          <CategorySelector onCategorySelect={handleCategorySelect} />
        </div>
      </section>

      <section className="task-display">
        <div className="container">
          {selectedCategory && selectedCategory.automations && (
            <div className="automations-section">
              <h2>{selectedCategory.name} Automations</h2>
              <div className="automations-grid">
                {selectedCategory.automations.map((automation, index) => (
                  <div 
                    key={index} 
                    className="automation-card"
                    onClick={() => handleAutomationClick(automation)}
                  >
                    <h3>{automation.title}</h3>
                    <p>{automation.description}</p>
                    <div className="tools-section">
                      <strong>Tools:</strong> {automation.tools.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <TaskDisplay categoryId={selectedCategory?.index} />
        </div>
      </section>

      <section className="coming-soon" id="coming-soon">
        <div className="container">
          <ComingSoon />
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      {selectedAutomation && (
        <AutomationModal 
          automation={selectedAutomation} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default LandingPage;
