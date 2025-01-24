 import React from 'react';
import { Helmet } from 'react-helmet';
import './WhyAutomation.css';

const WhyAutomation = () => {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Why Business Automation Matters",
              "description": "Discover how automation can transform your business operations, reduce costs, and improve efficiency.",
              "articleSection": "Business Automation Benefits",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://bizeaseai.com/#why-automation"
              }
            }
          `}
        </script>
      </Helmet>

      <section className="why-automation" id="why-automation" aria-labelledby="why-automation-title">
        <div className="container">
          <h2 id="why-automation-title">Why Automation Matters</h2>
          
          <div className="video-content" aria-label="demonstration video">
            <div className="video-container">
              <div className="coming-soon-overlay" role="status">
                <span>Video Coming Soon</span>
                <p className="video-description">Watch how automation transforms daily business operations</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default WhyAutomation;
