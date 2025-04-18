import React from 'react';
import './ThankYou.css';

const ThankYouPage = ({ onBackToStart }) => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="check-icon">✓</div>
        <h2>Thank You!</h2>
        <p>Your submission has been received.</p>
        <p>One of our insurance specialists will contact you soon.</p>
        <button 
          className="back-to-start-button"
          onClick={onBackToStart}
        >
          Submit Another Application
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;