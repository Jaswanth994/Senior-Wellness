import React from 'react';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ animationData, title, description, link }) => {
  return (
    <Link to={link} className="card">
      <div className="circle-container">
        <div className="lottieanimation">
          <Lottie animationData={animationData} />
        </div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

Card.propTypes = {
  animationData: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
