import React, { useState } from 'react';
import './article.css';

const articles = [
  "Where to Find the Help Section in an App and How It Can Assist with Common Problems",
  "How to Search for Information in an App",
  "How to Create a New Account in Any App",
  "How to Access the Main Menu of an App",
  "How to Update Your Profile Information in an App",
  "How to Send a Message to Someone from an App",
  "How to Change Notification Settings in an App",
  "How to Track Your Activity in an App",
  "What the Submit Button Looks Like",
  "How to Log Out of an App Safely",
  "How to Install a New App on Your Phone",
  "How to Check Notifications in an App",
  "How to Add an Event to Your Calendar Using an App",
  "How to Share Content from an App",
  "How to Provide Feedback or Report Issues in an App"
];

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
