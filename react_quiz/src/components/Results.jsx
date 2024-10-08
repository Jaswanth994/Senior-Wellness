import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Results.css'; // Assuming you have a separate CSS file

const Results = () => {
  const location = useLocation();
  const { score } = location.state; // Assuming score is passed via React Router state
  
  const suggestions = [
    { topic: "Introduction to Basic Tech Concepts", url: "#" },
    { topic: "Intermediate Tech Trends", url: "#" },
    { topic: "Advanced Technical Innovations", url: "#" },
  ];

  const getArticleSuggestions = () => {
    if (score === 5) {
      return suggestions; // Return all articles
    } else if (score >= 3) {
      return suggestions.slice(1); // Return intermediate and advanced articles
    } else {
      return suggestions.slice(2); // Return only advanced article
    }
  };

  return (
    <div className="results-container text-center">
      <h2>Your Score: {score} / 5</h2>
      <p>Based on your score, here are some articles you might want to read:</p>
      <ul className="list-group">
        {getArticleSuggestions().map((suggestion, index) => (
          <li key={index} className="list-group-item">
            <a href={suggestion.url}>{suggestion.topic}</a>
          </li>
        ))}
      </ul>

      {/* Add a button to navigate to the article page */}
      <Link to="/articles" className="btn btn-primary mt-3">
        See All Recommended Articles
      </Link>

      {/* Add a button to go back to the home page */}
      <Link to="/" className="btn btn-secondary mt-3">
        Go to Home
      </Link>
    </div>
  );
};

export default Results;
