import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScamPreventionHome from './components/ScamPreventionHome';
import LinkChatbot from './components/LinkChatbot';
import CoverPage from './components/CoverPage'; // Import the CoverPage component
import BackgroundImage from './components/BackgroundImage';

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  const handleProceed = () => {
    setHasStarted(true); // Set to true once the Proceed button is clicked
  };

  return (
    <div className="App">
      {!hasStarted ? (
        <CoverPage onProceed={handleProceed} />
      ) : (
        <>
          <BackgroundImage /> {/* Ensure this is included when hasStarted is true */}
          <Router>
            <Routes>
              <Route path="/" element={<ScamPreventionHome />} />
              <Route path="/link-chatbot" element={<LinkChatbot />} />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
