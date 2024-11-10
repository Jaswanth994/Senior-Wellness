// CoverPage.jsx
import React, { useState, useEffect } from 'react';
import './CoverPage.css'; // Add a CSS file for the animation
import newImage from '../assets/new-image.png'; // Path to your new image

const CoverPage = ({ onProceed }) => {
  const [isAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set a timeout for 6 seconds to stop the zoom effect and show the button
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 6000); // 6 seconds for animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`cover-page ${isAnimationComplete ? 'zoom-out' : 'zoom-in'}`}>
      <img src={newImage} alt="New Cover" className="cover-image" />
      {isAnimationComplete && (
        <button className="proceed-button" onClick={onProceed}>
          Proceed
        </button>
      )}
    </div>
  );
};

export default CoverPage;
