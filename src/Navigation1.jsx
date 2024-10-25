
// src/Navigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './homepagefolder/Navigation.css';



const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink 
        to="/" 
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Home
      </NavLink>
      <NavLink 
        to="/login" 
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Login
      </NavLink>
    </nav>
  );
};

export default Navigation;
