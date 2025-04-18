import React, { useState } from 'react';
import './App.css';
import AutoInsuranceForm from './components/AutoInsuranceForm';
import HealthInsuranceForm from './components/HealthInsuranceForm';
import ThankYouPage from './components/ThankYouPage';
import HomePage from './components/HomePage';
import Layout from './components/Layout';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedForm, setSelectedForm] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleGetStarted = () => {
    setCurrentView('form-selection');
  };

  const handleFormSelect = (formType) => {
    setSelectedForm(formType);
    setSubmitted(false);
  };

  const handleSubmitSuccess = () => {
    setSubmitted(true);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedForm(null);
    setSubmitted(false);
  };

  return (
    <Layout>
      <div className="app-container">
        {currentView === 'home' ? (
          <HomePage onGetStarted={handleGetStarted} />
        ) : (
          <div className="form-page-container">
            <header>
              <h1>Insurance Lead Form</h1>
              <button
                className="back-to-home-button"
                onClick={handleBackToHome}
              >
                Back to Home
              </button>
            </header>

            {!submitted ? (
              <>
                {!selectedForm ? (
                  <div className="form-selection">
                    <h2>Select Insurance Type</h2>
                    <div className="button-group">
                      <button
                        className="form-button"
                        onClick={() => handleFormSelect('auto')}
                      >
                        Auto Insurance
                      </button>
                      <button
                        className="form-button"
                        onClick={() => handleFormSelect('health')}
                      >
                        Health Insurance
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="back-button-container">
                      <button
                        className="back-button"
                        onClick={() => setSelectedForm(null)}
                      >
                        ← Back to Selection
                      </button>
                    </div>
                    {selectedForm === 'auto' ? (
                      <AutoInsuranceForm onSubmitSuccess={handleSubmitSuccess} />
                    ) : (
                      <HealthInsuranceForm onSubmitSuccess={handleSubmitSuccess} />
                    )}
                  </>
                )}
              </>
            ) : (
              <ThankYouPage onBackToStart={() => {
                setSelectedForm(null);
                setSubmitted(false);
              }} />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;