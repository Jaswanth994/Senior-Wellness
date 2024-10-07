import React from 'react';
import Navigation from './Navigation'; // Import Navigation component
import './Header.css'; // Import Header styles
const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Senior Wellness</h1>
      <Navigation /> {/* Navigation is included here */}
    </header>
  );
};

export default Header;
