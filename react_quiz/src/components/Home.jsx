import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to the Tech Help Quiz</h1>
      <p>Your profile will be displayed here</p>
      <Link to="/quiz" className="btn btn-primary">Start Quiz</Link>
    </div>
  );
};

export default Home;
