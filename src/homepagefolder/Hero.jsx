import React from 'react';
import heroImage from '../assets/image.png'; // Adjust the path if needed
import './Hero.css'; // Import CSS styles

const Hero = () => {
  return (
    <div className="hero">
      <div className="Hero-container">
        <img src={heroImage} alt="Hero" className="hero-image" />
        <div className="text-overlay">
          <h1 className="title-line1">SENIOR</h1>
          <h1 className="title-line2">WELLNESS</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
