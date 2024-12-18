import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (section) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(section);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <a href="/">BizEaseAI</a>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/ai-tools">AI Tools</a>
            </li>
            <li>
              <a onClick={() => handleNavClick('#automations-section')}>
                Automations
              </a>
            </li>
            <li>
              <a onClick={() => handleNavClick('#coming-soon')}>
                Coming Soon
              </a>
            </li>
            <li>
              <a onClick={() => handleNavClick('#contact-form')}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
