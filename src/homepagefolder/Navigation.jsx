// src/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
//import logo from '../assets/image.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-logo">
        <div className="header-title">Senior Wellness</div>
      </div>
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
        <NavLink to="/donate" className={({ isActive }) => (isActive ? 'active' : '')}>Donate</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact Us</NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
