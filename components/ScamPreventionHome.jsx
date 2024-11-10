// src/components/ScamPreventionHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./ScamPreventionHome.css";

const ScamPreventionHome = () => {
  const navigate = useNavigate();

  const handleLinksClick = () => {
    navigate('/link-chatbot');
  };

  return (
    <div className="scam-prevention-home">
      <h1>Scam Prevention</h1>
      <div className="options">
        <button onClick={handleLinksClick}>Messages(or)links</button>
        <button disabled>lorem</button>
        <button disabled>Calls</button>
      </div>
    </div>
  );
};

export default ScamPreventionHome;
