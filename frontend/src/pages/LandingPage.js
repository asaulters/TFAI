import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CategorySelector from '../components/category/CategorySelector';
import TaskDisplay from '../components/category/TaskDisplay';
import GeneralAutomations from '../components/automations/GeneralAutomations';
import WhyAutomation from '../components/sections/WhyAutomation';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/ContactForm';
import ComingSoon from '../components/ComingSoon';
import './LandingPage.css';

const LandingPage = () => {
  const location = useLocation();
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

  useEffect(() => {
    if (location.state?.scrollToContact) {
      scrollToContact();
      // Clear the state to prevent scrolling on subsequent renders
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>TaskFlowAI - Streamline Your Business with AI Automation Solutions</title>
        <meta name="description" content="Discover AI-powered automation solutions tailored to your industry. Streamline workflows, reduce costs, and boost efficiency with our intelligent automation tools." />
        <meta name="keywords" content="business automation, AI automation, workflow automation, industry automation, business efficiency, TaskFlowAI" />
        <link rel="canonical" href="https://taskflowai.com" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="TaskFlowAI - Streamline Your Business with AI Automation" />
        <meta property="og:description" content="Discover AI-powered automation solutions tailored to your industry. Streamline workflows, reduce costs, and boost efficiency." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://taskflowai.com" />
        <meta property="og:image" content="/TaskFlowAI_logo_transparent.png" />
        
        {/* Schema.org markup for rich results */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "TaskFlowAI",
              "applicationCategory": "BusinessApplication",
              "description": "AI-powered automation solutions for streamlining business workflows and improving efficiency",
              "offers": {
                "@type": "Offer",
                "category": "Business Automation Solutions"
              },
              "featureList": [
                "Industry-specific automations",
                "General business automations",
                "AI-powered workflow optimization",
                "Custom automation solutions"
              ]
            }
          `}
        </script>
      </Helmet>

      <main className="landing-page">
      <section className="hero" aria-label="hero">
        <div className="container">
          <h1>Streamline Your Business with AI</h1>
          <p className="hero-subtitle">Discover automation solutions tailored to your industry needs</p>
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

      <section 
        className="automations-section" 
        id="automations-section" 
        ref={automationsSectionRef}
        aria-label="automation solutions"
      >
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

      <section id="coming-soon" ref={comingSoonRef} aria-label="upcoming features">
        <ComingSoon />
      </section>

      <section aria-label="frequently asked questions">
        <FAQ />
      </section>
      
      <section id="contact-form" ref={contactFormRef} aria-label="contact form">
        <ContactForm />
      </section>
      </main>
    </>
  );
};

export default LandingPage;
