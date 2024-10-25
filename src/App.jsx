// src/App.jsx
import React from 'react';
//import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Navigate, Routes, Route } from 'react-router-dom';
import Homepage from './homepagefolder/HomePage';  // Homepage component
import Login from './login&profile/Login.jsx';  // Login component
import Profile from './login&profile/Profile';  // Profile component
import HelloWorld from './login&profile/Home';  // HelloWorld component
// import Navigation from './homepagefolder/Navigation'; 
import WelcomePopup from './Popup'; // Navigation component
import AfterLogin from './homepagefolder/Afterlogin.jsx';
import './App.css';  // Global styles

import Home from './components/Home.jsx';
import Quiz from './components/Quiz.jsx';
import Results from './components/Results.jsx';
import ArticlePage from './components/articelpage.jsx'; //
import Livetutorial from './livetutorials/lv.jsx';
import LocationSharingGuide from './livetutorials/livetutorials/lv1/lv1.jsx'; 
import MapsGuide from './livetutorials/livetutorials/lv2/lv2.jsx'
import Ringtone from './livetutorials/livetutorials/lv3/lv3.jsx';


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
        <Route path="/afterlogin" element={<AfterLogin />} /> {/* AfterLogin Route */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/quizhome" element={<Home />} />
        <Route path="/article-page" element={<ArticlePage />} />
        <Route path="/livetutorial" element={<Livetutorial />} />
        <Route path="/option/location-guide" element={<LocationSharingGuide />} />
        <Route path="/option/maps-guide" element={<MapsGuide />} />
        <Route path="/option/ring" element={<Ringtone />} />
        {/* If users go to an undefined route, you can redirect them */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

