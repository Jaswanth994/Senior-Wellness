// src/components/PageOne.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PageOne.css';
import scamImage from '../components/Scam2.jpg';
import scamRingtone from '../assets/scamRingtone.mp3';
import backgroundImage from '../assets/background.jpg'; // Import the background image

function PageOne() {
  const [showScamPopup, setShowScamPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleYesClick = () => {
    setShowScamPopup(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setTimeout(() => {
      navigate('/landing1');
    }, 2000);
  };

  const handleNoClick = () => {
    setShowSuccessPopup(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setTimeout(() => {
      navigate('/linkhome');
    }, 2000);
  };

  return (
    <div className="page-container" style={{ backgroundImage: `url(${backgroundImage})` }}> {/* Set background image */}
      <audio ref={audioRef} src={scamRingtone} loop />

      <div className="image-container">
        <img src={scamImage} alt="Scam Alert" className="oscillating-image" />
        <button className="image-button1 yes-button1" onClick={handleYesClick}>Yes</button>
        <button className="image-button1 no-button1" onClick={handleNoClick}>No</button>
      </div>

      {showScamPopup && (
        <div className="overlay">
          <div className="popup">
            <p>You have been scammed!</p>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="overlay">
          <div className="popup success-popup">
            <p>Well Done! You have Identified the Scam</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageOne;
