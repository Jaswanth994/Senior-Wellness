import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Results.css'; // Make sure the CSS file is named correctly
import './articelpage.jsx';

const Results = () => {
  const location = useLocation();
  const { score } = location.state;

  const suggestions = [
    { topic: "Beginner Appnavigation Articles", url: "/beginner-strategies" },
    { topic: "Intermediate Appnavigation Techniques", url: "/intermediate-tactics" },
    { topic: "Advanced Appnavigation Concepts", url: "/advanced-techniques" }
  ];

  // Select one article based on the score
  const getArticleSuggestion = () => {
    if (score === 15) {
      return suggestions[2]; 
    } else if (score >= 10) {
      return suggestions[1]; 
    } else {
      return suggestions[0]; 
    }
  };

  const renderMessage = () => {
    if (score === 15) {
      return "Excellent! You got a perfect score!";
    } else if (score >= 10) {
      return "Great job! You're doing well, keep going!";
    } else {
      return "Keep practicing! You'll improve with more quizzes!";
    }
  };

  const suggestion = getArticleSuggestion();

  return (
    <div className="results-container">
      <div className="resultcard">
        <h2>Your Score: {score} / 15</h2>
        <p>{renderMessage()}</p>
        <Link to="/article-page" className="btn btn-primary">
          Read Articles for Improvement
        </Link>
      </div>
      <Link to="/" className="btn btn-secondary go-to-home">Go to Home</Link>
    </div>
  );
};

export default Results;
