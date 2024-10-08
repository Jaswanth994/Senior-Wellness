// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './HomePage';  // Homepage component
import Login from './Login';  // Login component
import Profile from './Profile';  // Profile component
import HelloWorld from './Home';  // HelloWorld component
import Navigation from './Navigation';  // Navigation component
import './App.css';  // Global styles

function App() {
  return (
    <div className="App">

      {/* Define the routing logic */}
      <Routes>
        {/* Default route to redirect to the Homepage */}
        <Route path="/" element={<Homepage />} />
        
        {/* Other routes for login, profile, hello world */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/helloworld" element={<HelloWorld />} />
        
        {/* If users go to an undefined route, you can redirect them */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
export default App;
