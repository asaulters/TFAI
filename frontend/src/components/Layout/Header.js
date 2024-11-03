import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/TaskFlowAI_logo_transparent.png" alt="TaskFlowAI Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#business-selection">Businesses</Link></li>
            <li><Link to="/ai-tools">AI Tools</Link></li>
            <li><Link to="/#coming-soon">Coming Soon</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
