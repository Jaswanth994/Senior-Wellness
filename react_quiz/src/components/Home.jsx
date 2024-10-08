import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import appNavAnimation from './AppNavigation.json';  // Adjust the path if necessary
import webNavAnimation from './WebpageNavigation.json';  // Adjust the path if necessary
import androidNavAnimation from './AndroidNavigation.json';  // Adjust the path if necessary
import iosNavAnimation from './DesktopNavigation.json';  // Adjust the path if necessary
import './Home.css';  // Import the CSS file

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to the Tech Help Quiz</h1>
      <p>Select a navigation type to start the quiz:</p>

      {/* Options container */}
      <div className="options-container">
        
        {/* App Navigation (Clickable) */}
        <div className="option-box">
          <Link to="/quiz" className="link">
            <div className="animation-container">
              <Lottie
                animationData={appNavAnimation}
                loop
                className="lottie-animation"  // Using class instead of inline style
              />
            </div>
            <p className="caption">App Navigation Quiz</p>
          </Link>
        </div>

        {/* Web Navigation (Disabled) */}
        <div className="option-box">
          <div className="link disabled">
            <div className="animation-container">
              <Lottie
                animationData={webNavAnimation}
                loop
                className="lottie-animation"  // Using class instead of inline style
              />
            </div>
            <p className="caption">Web Navigation Quiz</p>
          </div>
        </div>

        {/* Android Navigation (Disabled) */}
        <div className="option-box">
          <div className="link disabled">
            <div className="animation-container">
              <Lottie
                animationData={androidNavAnimation}
                loop
                className="lottie-animation"  // Using class instead of inline style
              />
            </div>
            <p className="caption">Android Navigation Quiz</p>
          </div>
        </div>

        {/* iOS Navigation (Disabled) */}
        <div className="option-box">
          <div className="link disabled">
            <div className="animation-container">
              <Lottie
                animationData={iosNavAnimation}
                loop
                className="lottie-animation"  // Using class instead of inline style
              />
            </div>
            <p className="caption">iOS Navigation Quiz</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
