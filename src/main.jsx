// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';  // Simple placeholder component
import Login from './Login';  // Login logic
import Profile from './Profile';  // Profile logic
import HelloWorld from './Home';  // HelloWorld logic

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            {}
            <Route path="/" element={<Navigate to="/login" />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/profile" element={<Profile />} />  
            <Route path="/helloworld" element={<HelloWorld />} /> 
            <Route path="/app" element={<App />} />  
        </Routes>
    </BrowserRouter>
);
