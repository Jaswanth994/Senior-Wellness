import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, category } = location.state;

  const renderMessage = () => {
    if (score >= 10) {
      return "Excellent! You're doing great!";
    } else if (score >= 5) {
      return "Good effort! Keep practicing!";
    } else {
      return "Don't worry! Practice makes perfect!";
    }
  };

  const handleNavigateToLearning = () => {
    // if (score >= 3) {
      navigate('/article-page', { state: { category, score } });
    // } else {
      // navigate(`/${category}-basics`, { state: { category, score } });
    // }
  };

  return (
    <div className="results-container">
      <div className="result-card">
        <h2>Your Score: {score} / 5</h2>
        <p>{renderMessage()}</p>
        <button className="btn btn-primary" onClick={handleNavigateToLearning}>
          Explore Learning Materials
        </button>
      </div>
    </div>
  );
};

export default Results;
