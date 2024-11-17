// src/components/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import Header from "../../../Header"
import backgroundImage from '../assets/background1.png'; // Imported, but not needed in JSX

function HomePage() {
  const navigate = useNavigate();

  return (
    <div><Header />
    <div className="home-container">
      
      <h1>Understand And Click the correct Button in the Link (This is Only a STIMULATION)</h1>
      <button onClick={() => navigate('/page1')}>https/ajjsojjo.com</button>
      <button onClick={() => navigate('/page2')}>https/cgipaymentgate.com</button>
      <button onClick={() => navigate('/page3')}>https/geidoorway.com</button>
      </div>
    </div>
  );
}

export default HomePage;
