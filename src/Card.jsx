import React from 'react';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import './Card.css'; // Import Header styles

const Card = ({ animationData, title, description }) => {
  return (
    <div className="card">
      <div className="lottieanimation">
        <Lottie animationData={animationData} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p> {/* Display the description here */}
    </div>
  );
};

// Define the prop types
Card.propTypes = {
  animationData: PropTypes.object, // Make this optional
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
