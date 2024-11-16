import React, { useEffect } from 'react';
import heroImage from '../assets/image.png'; // Adjust the path if needed
import './Hero.css'; // Import CSS styles

const Hero = () => {
  // Create an array for the blocks grid (20x10 = 200 blocks)
  const blocks = Array.from({ length: 200 });

  useEffect(() => {
    // Add a staggered delay to each block for the reveal effect
    const blockElements = document.querySelectorAll('.block');
    blockElements.forEach((block, index) => {
      block.style.animationDelay = `${index * 0.005}s`; // Adjust delay for effect speed
    });
  }, []);

  return (
    <div className="hero">
      <div className="Hero-container">
        {/* Overlay blocks for reveal effect */}
        <div className="block-overlay">
          {blocks.map((_, index) => (
            <div key={index} className="block"></div>
          ))}
        </div>
        </div>
      </div>
  );
};

export default Hero;
