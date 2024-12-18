import React, { useState } from 'react';
import './EmailModal.css';

const EmailModal = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    onSubmit(email);
  };

  return (
    <div className="email-modal-overlay" onClick={onClose}>
      <div className="email-modal-content" onClick={e => e.stopPropagation()}>
        <h2>Download PDF Walkthrough</h2>
        <p>Enter your email to receive the full PDF walkthrough</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <div className="modal-buttons">
            <button type="submit" className="submit-button">Send PDF</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
