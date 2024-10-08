import React, { useState } from 'react';
import './article.css';

const articles = Array.from({ length: 15 }, (_, i) => `Article ${i + 1} - Lorem ipsum dolor sit amet`);

const ArticlePage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div className="article-page-container">
      <h1 className="article-page-title">Recommended Articles</h1>
      
      {selectedArticle ? (
        <div className="article-content">
          <h2>{selectedArticle}</h2>
          <p className="coming-soon">Coming Soon...</p>
          <button className="btn-back" onClick={() => setSelectedArticle(null)}>Back to Articles</button>
        </div>
      ) : (
        <div className="article-list">
          {articles.map((article, index) => (
            <div
              key={index}
              className="article-item"
              onClick={() => handleArticleClick(article)}
            >
              {article}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
