import React from 'react';
import './BackgroundImage.css';
import backgroundImage from '../assets/scam-prevention-bg.png';

const BackgroundImage = () => {
  return (
    <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div>
    </div>
  );
};

export default BackgroundImage;
