// Popup.jsx
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from './assets/anilion.json'; // Replace with the actual path to your Lottie animation
import './Popup.css'; // Styles for the popup

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown before
    const popupShown = localStorage.getItem('popupShown');

    if (!popupShown) {
      setShowPopup(true); // Show the popup
      localStorage.setItem('popupShown', 'true'); // Mark the popup as shown
    }

    // Automatically close the popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Popup stays for 3 seconds

    return () => {
      clearTimeout(timer); // Cleanup on unmount
      if (!popupShown) {
        localStorage.setItem('popupShown', 'true'); // Mark as shown only if it hasn't been shown before
      }
    };
  }, []);

  return (
    <>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="lottie-container">
              <Lottie animationData={animationData} style={{ width: 150, height: 150 }} />
            </div>
            <h2>Welcome to Senior Wellness!</h2>
            <p>Your wellness journey begins here.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePopup;
