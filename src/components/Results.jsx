import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './Results.css';

const Results = () => {
  const location = useLocation();
  const { score, userName } = location.state; // Assuming userName is passed in location.state

  const suggestions = [
    { topic: "Beginner Appnavigation Articles", url: "/beginner-strategies" },
    { topic: "Intermediate Appnavigation Techniques", url: "/intermediate-tactics" },
    { topic: "Advanced Appnavigation Concepts", url: "/advanced-techniques" }
  ];

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

  // Function to save quiz result
  const saveQuizResult = async () => {
    try {
      // Send a POST request to the backend to save the quiz result
      const response = await axios.post('http://localhost:5000/api/quizResult/save', {
        userName: userName || 'Anonymous', // Assuming userName is available
        score: score
      });
      console.log('Result saved:', response.data.message);
    } catch (error) {
      console.error('Failed to save quiz result:', error);
    }
  };

  // useEffect to save the result when the component mounts
  useEffect(() => {
    saveQuizResult();
  }, [score]);

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
