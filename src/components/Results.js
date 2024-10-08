// src/components/Results.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'Results.css';

const Results = () => {
  const location = useLocation();
  const { score } = location.state;

  const suggestions = [
    { topic: "Lorem Ipsum Basics", url: "#" },
    { topic: "Dolor Sit Techniques", url: "#" },
    { topic: "Advanced Lorem Methods", url: "#" },
  ];

  return (
    <div className="container text-center">
      <h2>Your Score: {score} / 10</h2>
      <p>"Based on your score, here are some articles you might want to read:"</p>
      <ul className="list-group">
        {suggestions.map((suggestion, index) => (
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
