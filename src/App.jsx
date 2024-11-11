// src/App.jsx
// import React from 'react';
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './homepagefolder/HomePage';  // Homepage component
import Login from './login&profile/Login.jsx';     // Login component
import Profile from './login&profile/Profile';     // Profile component
import HelloWorld from './login&profile/Home';     // HelloWorld component
import Navigation from './homepagefolder/Navigation'; 
import WelcomePopup from './Popup';                // Popup component
import './App.css';                               // Global styles

import Home from './components/Home.jsx';
import Quiz from './components/Quiz.jsx';
import Results from './components/Results.jsx';
import ArticlesPage from './components/ArticlesPage.jsx';


function App() {

  const textToTranslate = 'Hello, welcome to our website!';

  return (
    <div className="App">
       
   
    {/* <Navigation /> */}
      {/* Define the routing logic */}
      <Routes>
        {/* Default route to redirect to the Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Other routes for login, profile, hello world */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/helloworld" element={<HelloWorld />} />
        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/type1-articles" element={<ArticlesPage />} />
        <Route path="/type2-articles" element={<ArticlesPage />} />
        <Route path="/quizhome" element={<Home />} />
        {/* <Route path="/article-page" element={<ArticlePage />} /> */}

        {/* Redirect undefined routes to Homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      

    </div>
  );
}

export default App;
