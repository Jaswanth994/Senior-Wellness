// Popup.jsx
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from './assets/anilion.json'; // Ensure your Lottie animation file path is correct
import './Popup.css'; // Popup styles

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown before
    const popupShown = localStorage.getItem('popupShown');

    if (!popupShown) {
      setShowPopup(true);
      localStorage.setItem('popupShown', 'true');
    }

    // Auto close popup after 3 seconds
    const timer = setTimeout(() => {
      setIsAnimationFinished(true);
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="lottie-container">
              <Lottie
                animationData={animationData}
                style={{ width: 150, height: 150 }}
              />
            </div>
            <h2 className="popup-title">Welcome to Senior Wellness!</h2>
            <p className="popup-message">Your wellness journey begins here.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePopup;
