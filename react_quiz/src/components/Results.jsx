import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const { score } = location.state;
  
    const suggestions = [
      { topic: "Beginner Quiz Strategies", url: "#" },
      { topic: "Intermediate Quiz Tactics", url: "#" },
      { topic: "Advanced Quiz Techniques", url: "#" },
    ];
  
    const getArticleSuggestions = () => {
      if (score === 5) {
        return suggestions;
      } else if (score >= 3) {
        return suggestions.slice(1); // suggest intermediate and advanced articles
      } else {
        return suggestions.slice(2); // suggest only advanced articles
      }
    };
  
    return (
      <div className="container text-center">
        <h2>Your Score: {score} / 5</h2>
        <p>Based on your score, here are some articles you might want to read:</p>
        <ul className="list-group">
          {getArticleSuggestions().map((suggestion, index) => (
            <li key={index} className="list-group-item">
              <a href={suggestion.url}>{suggestion.topic}</a>
            </li>
          ))}
        </ul>
        <Link to="/" className="btn btn-primary mt-3">Go to Home</Link>
      </div>
    );
  };

export default Results;
