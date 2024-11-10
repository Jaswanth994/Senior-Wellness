import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScamPreventionHome.css'; // Combined CSS for both CoverPage and App
import backgroundimage from './assets/scam-prevention-bg.png'; // Background image
import newImage from './assets/new-image.png'; // Cover image for the animation

const ScamPreventionHome = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isAnimationComplete, setAnimationComplete] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    setHasStarted(true); // Show main options once Proceed is clicked
  };

  const handleMsgClick = () => {
    navigate('/link-chatbot'); // Navigate to link-chatbot page
  };

  const handleCall = () => {
    navigate('/call'); // Navigate to call simulation page
  };

  const handlelink = () => {
    navigate('/linkhome');
  }

  const handlehome = () => {
    navigate('/');
  }

  useEffect(() => {
    // Set a timeout to stop the zoom effect after 6 seconds and show the Proceed button
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 6000); // 6 seconds for animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="scam-prevention-home"
      style={{
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
    >
      {!hasStarted ? (
        <div className={`cover-page ${isAnimationComplete ? 'zoom-out' : 'zoom-in'}`}>
          <img src={newImage} alt="New Cover" className="cover-image" />
          {isAnimationComplete && (
            <button className="proceed-button" onClick={handleProceed}>
              Proceed
            </button>
          )}
        </div>
      ) : (
        <div className="main-options">
          <button className="home" onClick={handlehome} >HomePage</button>
          <h1>Scam Prevention</h1>
          <div className="options">
            <button onClick={handleMsgClick}>Message</button>
            <button onClick={handlelink}>Links</button>
            <button onClick={handleCall}>Calls</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScamPreventionHome;
