import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          © 2024 TaskFlowAI. All rights reserved.
        </div>
        <div className="footer-links">
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
