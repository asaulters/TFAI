import React, { useState, useRef } from 'react';
import CategorySelector from '../components/category/CategorySelector';
import TaskDisplay from '../components/category/TaskDisplay';
import GeneralAutomations from '../components/automations/GeneralAutomations';
import WhyAutomation from '../components/sections/WhyAutomation';
import ContactForm from '../components/ContactForm';
import ComingSoon from '../components/ComingSoon';
import './LandingPage.css';

const LandingPage = () => {
  console.log('LandingPage rendering');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('');
  const automationsSectionRef = useRef(null);
  const comingSoonRef = useRef(null);
  const contactFormRef = useRef(null);

  const handleCategorySelect = (categoryData) => {
    setSelectedCategory(categoryData);
  };

  const scrollToAutomations = (mode) => {
    setViewMode(mode);
    automationsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToComingSoon = () => {
    comingSoonRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container">
          <h1>Streamline Your Business with AI</h1>
          <p>Discover automated solutions tailored to your needs</p>
          <div className="cta-buttons">
            <button 
              className="cta-button industry"
              onClick={() => scrollToAutomations('industry')}
            >
              Industry Specific Automations
            </button>
            <button 
              className="cta-button general"
              onClick={() => scrollToAutomations('general')}
            >
              General Automations
            </button>
          </div>
        </div>
      </section>

      <section className="automations-section" id="automations-section" ref={automationsSectionRef}>
        {!viewMode ? (
          <p className="select-prompt">Please Choose Automation Type Above!</p>
        ) : viewMode === 'industry' ? (
          <>
            <h2 className="section-title">Select Your Industry</h2>
            <CategorySelector onCategorySelect={handleCategorySelect} />
            {selectedCategory && <TaskDisplay category={selectedCategory} />}
          </>
        ) : viewMode === 'general' ? (
          <>
            <h2 className="section-title">General Automations</h2>
            <GeneralAutomations />
          </>
        ) : null}
      </section>

      <WhyAutomation />

      <div id="coming-soon" ref={comingSoonRef}>
        <ComingSoon />
      </div>
      
      <div id="contact-form" ref={contactFormRef}>
        <ContactForm />
      </div>
    </div>
  );
};

export default LandingPage;
