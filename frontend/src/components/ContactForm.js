import React, { useState, useEffect, useId } from 'react';
import { Helmet } from 'react-helmet';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = () => {
  useEffect(() => {

    
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      console.log('Attempting to send email with:', {
        serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
        templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
      });

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Detailed Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact TaskFlowAI",
              "description": "Contact us to suggest new automation features or provide feedback",
              "mainEntity": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "availableLanguage": "English"
              }
            }
          `}
        </script>
      </Helmet>

      <section className="contact-section" aria-labelledby="contact-title">
        <h2 id="contact-title" className="contact-title">
          Don't see an automation you'd like, suggest it below or leave us some feedback. We'd love to hear from you.
        </h2>
        
        <form 
          onSubmit={handleSubmit} 
          className="contact-form"
          aria-label="Contact form"
          noValidate
        >
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
              minLength="2"
              maxLength="50"
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
              placeholder="Enter your email address"
              autoComplete="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
              minLength="10"
              maxLength="1000"
              placeholder="Tell us what automation you'd like to see or provide feedback"
              rows="5"
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
            className={status === 'sending' ? 'sending' : ''}
          >
            <span className="button-text">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </span>
            {status === 'sending' && (
              <span className="loading-spinner" aria-hidden="true" />
            )}
          </button>

          {status === 'success' && (
            <div 
              className="success-message" 
              role="alert"
              aria-live="polite"
            >
              <p>Message sent successfully! We'll get back to you soon.</p>
            </div>
          )}
          
          {status === 'error' && (
            <div 
              className="error-message" 
              role="alert"
              aria-live="assertive"
            >
              <p>Failed to send message. Please try again or contact us directly at support@taskflowai.com</p>
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default ContactForm;
