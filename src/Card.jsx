import React from 'react';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import './Card.css'; // Import Header styles
const Card = ({ animationData, title }) => {
  return (
    <div className="card">
      <div className="lottieanimation">
      <Lottie
        animationData={animationData}
      />
      </div>
      <h3>{title}</h3>
    </div>
  );
};

// Define the prop types
Card.propTypes = {
  animationData: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
