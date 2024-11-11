// Components/TechHelp/ArticlesPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './ArticlesPage.css';

const ArticlesPage = () => {
  const location = useLocation();
  const { articles } = location.state || { articles: [] };

  return (
    <div className="articles-page-container">
      <h2>Articles for Improvement</h2>
      {articles.length === 0 ? (
        <p>No articles available.</p>
      ) : (
        articles.map((article, index) => (
          <div key={index} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p><i>By {article.author}</i></p>
            <p><i>{new Date(article.date).toLocaleDateString()}</i></p>
          </div>
        ))
      )}
    </div>
  );
};

export default ArticlesPage;
