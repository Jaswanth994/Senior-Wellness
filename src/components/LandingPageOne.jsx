// src/components/LandingPageOne.jsx
import React from 'react';
import '../styles/LandingPageOne.css';
import { useNavigate } from 'react-router-dom';





function LandingPageOne() {
  const navigate = useNavigate();
  const onBack = () => {
    navigate('/');
  };
  return (
    <div className="landing-container">
      <h1>You Can Be Scammed If You Click "Yes"</h1>
      <div className="article-content">
        <p>
          This popup is likely a scam because it uses fear tactics and urgency, prompting users to download questionable software. It claims "unknown threats" are compromising sensitive information, which is a common trick to make users act quickly. Legitimate antivirus providers do not use such alarming popups or ask for immediate downloads in this way.
        </p>
        <p>
          <strong>Similar scams often include:</strong>
        </p>
        <ul>
          <li><strong>Fake Antivirus Software:</strong> Prompts to download “virus removal” tools that are actually malware.</li>
          <li><strong>Tech Support Scams:</strong> Popups that display a phone number for fake support agents who then try to access your computer.</li>
          <li><strong>Phishing Links:</strong> Clickbait links that lead to phishing sites or initiate harmful downloads.</li>
        </ul>
        <p>
          <strong>How to Stay Safe:</strong> Avoid clicking suspicious popups, keep your security software up to date, and be cautious of any alarmist warnings that appear in-browser.
        </p>
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

export default LandingPageOne;
