import React from 'react';
import './App.css'; // Ensure the CSS file is linked

// Importing icons (Ensure these libraries are installed: react-icons/fa)
import { FaHandsHelping, FaShieldAlt, FaChalkboardTeacher } from 'react-icons/fa';

const Homepage = () => {
  return (
    <div className="App">
      {/* Header Section */}
      <div className="container">
      <header className="header">
        <h1>Senior Wellness</h1>
      </header>

      {/* Navigation Section */}
      <nav className="nav">
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
      </nav>

      </div>
      
      {/* Hero Section */}
      <section className="hero">
        <h2>Helping Seniors Navigate Tech Safely</h2>
      </section>

      {/* Main Cards Section */}
      <section className="section">
        {/* Tech Help Card */}
        <div className="card">
          <FaHandsHelping size={50} color="#004d40" />
          <h3>Tech Help</h3>
        </div>

        {/* Scam Prevention Card */}
        <div className="card">
          <FaShieldAlt size={50} color="#d32f2f" />
          <h3>Scam Prevention</h3>
        </div>

        {/* Live Tutorials Card */}
        <div className="card">
          <FaChalkboardTeacher size={50} color="#1565c0" />
          <h3>Live Tutorials</h3>
        </div>
      </section>

      {/* Latest Articles & Vlogs Section */}
      <section className="hero">
        <h2>Latest Articles & Vlogs</h2>
        <div className="section">
          <div className="card">
            <h3>Understanding Tech</h3>
          </div>
          <div className="card">
            <h3>Common Scams</h3>
          </div>
          <div className="card">
            <h3>Mastering Online Banking</h3>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 Senior Wellness. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;