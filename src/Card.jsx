import React from 'react';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Card.css'; // Import Header styles

const Card = ({ animationData, title, description, link }) => {
  return (
    <Link to={link} className="card"> {/* Wrap the card content in a Link */}
      <div className="lottieanimation">
        <Lottie animationData={animationData} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p> {/* Display the description here */}
    </Link>
  );
};

// Define the prop types
Card.propTypes = {
  animationData: PropTypes.object, // Make this optional
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired, // Add a link prop to navigate
};

export default Card;
