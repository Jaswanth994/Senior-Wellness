// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';
import PageThree from './components/PageThree';
import LandingPageOne from './components/LandingPageOne';
import LandingPageTwo from './components/LandingPageTwo';
import LandingPageThree from './components/LandingPageThree';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/page1" element={<PageOne />} />
        <Route path="/page2" element={<PageTwo />} />
        <Route path="/page3" element={<PageThree />} />
        <Route path="/landing1" element={<LandingPageOne />} />
        <Route path="/landing2" element={<LandingPageTwo />} />
        <Route path="/landing3" element={<LandingPageThree />} />
      </Routes>
    </Router>
  );
}

export default App;
