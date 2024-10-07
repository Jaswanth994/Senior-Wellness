import React from 'react';
import PropTypes from 'prop-types';
import heroImage from './assets/image.png'; // Adjust the path if needed
import './Hero.css'; // Import Header styles
const Hero = () => {
  return (
    <div className='Hero-container'>
        <img src={heroImage} alt="Hero" className="hero-image" />
    </div>
    
  );
};

// No need for prop types if you're not using props
export default Hero;
