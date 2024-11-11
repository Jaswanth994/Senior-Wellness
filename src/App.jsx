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
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from './LanguageSwitcher';
import TranslationComponent from './components/TranslationComponent';


function App() {
  // const { t } = useTranslation();  // Initialize the translation function
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement('script');
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Google Translate widget initialization function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'hi,te,ta,kn,ml,gu,bn,mr,pa,en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    addScript();
  }, []);

  const textToTranslate = 'Hello, welcome to our website!';

  return (
    <div className="App">
       
    {/* Add Navigation component if needed */}
    {/* <Navigation /> */}
    {/* <div id="google_translate_element" className="w-full mb-4"></div> */}
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

       {/* Welcome popup */}
       {/* <WelcomePopup /> */}

{/* Language Switcher for changing languages */}
{/* <LanguageSwitcher /> */}

<h1>Language Translation App</h1>
<TranslationComponent textToTranslate={textToTranslate} />

    </div>
  );
}

export default App;
