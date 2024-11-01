// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';  // Main App Component
import './index.css';  // Global styles (optional)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />  {/* All routes are handled inside App */}
    </BrowserRouter>
  </React.StrictMode>
);
