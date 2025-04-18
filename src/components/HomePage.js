import React, { useState } from 'react';
import './HomePage.css';

const HomePage = ({ onGetStarted }) => {
  const [showNotification, setShowNotification] = useState(true);
  
  return (
    <div className="homepage-content">
      {showNotification && (
        <div className="notification-popup">
          <p>Thank you for submitting your insurance inquiry. A representative will review your application shortly.</p>
          <button onClick={() => setShowNotification(false)}>✕</button>
        </div>
      )}
      
      <main className="homepage-main">
        <div className="hero-content">
          <h2 className="hero-heading">Find the Right Insurance Coverage</h2>
          <div className="tagline-container">
            <p className="tagline">
              <span className="tagline-highlight">Secure your future today with less money down.</span>
              <br />
              Get your free quote now and discover your savings potential!
            </p>
          </div>
          <button
            className="get-started-button"
            onClick={onGetStarted}
          >
            Get Started
          </button>
        </div>
      </main>
      <footer className="homepage-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Insurance Services. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://www.iit.edu/privacy">Privacy Policy</a>
            <a href="https://www.iit.edu/procurement-services/vendor-resources/purchasing-requirements-terms-and-conditions/terms-and-conditions">Terms of Service</a>
            <a href="https://www.iit.edu/about/contact-us">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;