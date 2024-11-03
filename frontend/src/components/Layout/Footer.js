import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <img src="/logo-white.png" alt="TaskFlowAI Logo" />
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#business-selection">Businesses</a></li>
            <li><a href="/#coming-soon">Coming Soon</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-social">
          {/* Add social media icons here */}
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} TaskFlowAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
