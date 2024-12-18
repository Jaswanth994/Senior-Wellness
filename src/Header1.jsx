import React from 'react';
import Lottie from 'lottie-react';
import Navigation from './Navigation1'; // Import Navigation component
import './Header.css'; // Import Header styles
import animationData from './assets/animHeart.json';
import './homepagefolder/Navigation.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title-container">
        {/* <h1 className="header-title">Senior Wellness</h1> */}
        <div className="lottie-container">
          <Lottie animationData={animationData} style={{ width: 40, height: 40 }} />
        </div>
      </div>
      <Navigation /> {/* Navigation is included here */}
    </header>
  );
};


export default Header;



