// src/components/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import backgroundImage from '../assets/background1.png'; // Imported, but not needed in JSX

function HomePage() {
  const navigate = useNavigate();

  return (
    
    <div className="home-container">
      <div>
        <button onClick={() => navigate('/home')}>HomePage</button>
      </div>
      <h1>Understand And Click the correct Button in the Link (This is Only a STIMULATION)</h1>
      <button onClick={() => navigate('/page1')}>https/ajjsojjo.com</button>
      <button onClick={() => navigate('/page2')}>https/cgipaymentgate.com</button>
      <button onClick={() => navigate('/page3')}>https/geidoorway.com</button>
      
    </div>
  );
}

export default HomePage;