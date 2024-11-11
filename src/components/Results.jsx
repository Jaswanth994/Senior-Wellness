// Components/TechHelp/Results.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, category } = location.state;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const suggestions = {
    type1: "/type1-articles",  // URL for type1 articles page
    type2: "/type2-articles"   // URL for type2 articles page
  };

  const getArticleType = () => {
    // Show type1 articles for scores greater than 5, else type2
    return score >= 5 ? 'type1' : 'type2';
  };

  // Fetch articles based on type (type1 or type2)
  const fetchArticles = async (type) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/articles/${type}`);
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  };

  useEffect(() => {
    const articleType = getArticleType();
    fetchArticles(articleType);
  }, [score]);

  const renderMessage = () => {
    if (score === 15) {
      return "Excellent! You got a perfect score!";
    } else if (score >= 10) {
      return "Great job! You're doing well, keep going!";
    } else {
      return "Keep practicing! You'll improve with more quizzes!";
    }
  };

  const handleGoToArticles = () => {
    const articleType = getArticleType();
    navigate(suggestions[articleType], { state: { articles } });
  };

  return (
    <div className="results-container">
      <div className="resultcard">
        <h2>Your Score: {score} / 15</h2>
        <p>{renderMessage()}</p>
        <button className="btn btn-primary" onClick={handleGoToArticles}>
          Read Articles for Improvement
        </button>
      </div>
      <Link to="/" className="btn btn-secondary go-to-home">Go to Home</Link>
    </div>
  );
};

export default Results;
