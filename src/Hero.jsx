import React from 'react';
import heroImage from './assets/image.png'; // Adjust the path if needed
import './Hero.css'; // Import CSS styles

const Hero = () => {
  return (
    <div className="hero">
      <h2>Welcome to Senior Wellness!</h2>
      <div className="Hero-container">
        <img src={heroImage} alt="Hero" className="hero-image" />
      </div>
    </div>
  );
};

export default Hero;
