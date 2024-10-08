
// src/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/helloworld">HelloWorld</Link>
    </nav>
  );
};

export default Navigation;
