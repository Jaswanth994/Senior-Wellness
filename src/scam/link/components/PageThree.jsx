// src/components/PageOne.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PageThree.css';
import scamImage from '../assets/jackpot.jpg';
import scamRingtone from '../assets/applause.mp3';
import backgroundImage from '../assets/bingobackground.jpg';

function PageThree() {
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
      navigate('/landing3');
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
    <div className="page-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <audio ref={audioRef} src={scamRingtone} loop />

      <div className="image-container">
        <img src={scamImage} alt="Scam Alert" className="oscillating-image" />
        
        {/* Button container to align buttons horizontally with spacing */}
        <div className="button-container">
          <button className="image-button3 yes-button3" onClick={handleYesClick}>I CLAIM IT</button>
          <button className="image-button3 no-button3" onClick={handleNoClick}>NO I DON'T WANT FREE MONEY</button>
        </div>
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

export default PageThree;
