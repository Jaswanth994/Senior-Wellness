import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import appNavAnimation from './AppNavigation.json';
import webNavAnimation from './WebpageNavigation.json';
import androidNavAnimation from './AndroidNavigation.json';
import iosNavAnimation from './DesktopNavigation.json';
import './Home.css';
import Header from '../Header';
import backgroundImage from '../assets/bimg.png';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.2, // Adjust opacity as needed
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  return (
    <div>
       <Header />

    <div className= " quizhome" style={{ position: 'relative', height: '100vh' }}> {/* Wrapper to allow positioning */}
      <div style={backgroundStyle}></div> {/* Background div with opacity */}
      
      <h11>Welcome to the Tech Help Quiz</h11> {/* Removed the blue container */}
      <div className="grid-layout">
        <div className="option-box">
        <Link to="/quiz/web" className="link">
            <div className="animation-container">
              <Lottie animationData={webNavAnimation} loop className="lottie-animation" />
            </div>
            <p className="caption">Web Navigation Quiz</p>
          </Link>
        </div>
        <div className="option-box">
        <Link to="/quiz/android" className="link">
            <div className="animation-container">
              <Lottie animationData={androidNavAnimation} loop className="lottie-animation" />
            </div>
            <p className="caption">Android Navigation Quiz</p>
          </Link>
        </div>
        <div className="option-box">
        <Link to="/quiz/app" className="link">
            <div className="animation-container">
              <Lottie animationData={appNavAnimation} loop className="lottie-animation" />
            </div>
            <p className="caption">App Navigation Quiz</p>
            
          </Link>
        </div>
        <div className="option-box">
        <Link to="/quiz/desktop" className="link">
            <div className="animation-container">
              <Lottie animationData={iosNavAnimation} loop className="lottie-animation" />
            </div>
            <p className="caption">Desktop Navigation Quiz</p>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
