// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './HomePage';  // Homepage component
import Login from './Login';  // Login component
import Profile from './Profile';  // Profile component
import HelloWorld from './Home';  // HelloWorld component
import Navigation from './Navigation'; 
import WelcomePopup from './Popup'; // Navigation component
import './App.css';  // Global styles

import Home from './components/Home.jsx';
import Quiz from './components/Quiz.jsx';
import Results from './components/Results.jsx';
import ArticlePage from './components/articelpage.jsx'; //


function App() {
  return (
    <div className="App">
 <WelcomePopup />
      {/* Define the routing logic */}
      <Routes>
        {/* Default route to redirect to the Homepage */}
        <Route path="/" element={<Homepage />} />
        
        {/* Other routes for login, profile, hello world */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/helloworld" element={<HelloWorld />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/article-page" element={<ArticlePage />} />
        {/* If users go to an undefined route, you can redirect them */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

