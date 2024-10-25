// src/Navigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'; // Ensure you have styles to handle the active class

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
      <NavLink 
        to="/profile" 
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Profile
      </NavLink>
    </nav>
  );
};

export default Navigation;
