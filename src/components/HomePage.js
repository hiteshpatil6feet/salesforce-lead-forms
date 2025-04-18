import React from 'react';
import './HomePage.css';

const HomePage = ({ onGetStarted }) => {
  return (
    <div className="homepage-content">
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
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;