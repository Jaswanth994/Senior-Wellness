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
      <h1>You Might Be Scammed If You Click "Claim Reward"</h1>
      <div className="article-content">
        <p>
          Popups like these are classic examples of "clickbait scams" designed to trick users into providing personal information or downloading malware. Here's why this popup is likely a scam:
        </p>
        <p>
          <strong>Excessive Promises of Wealth:</strong> Claims of winning a million dollars with flashy visuals are often too good to be true. Scammers use large cash rewards to lure users into clicking without thinking.
        </p>
        <p>
          <strong>Countdown Timer:</strong> The "ONLY 45 MINUTES LEFT!" message creates a false sense of urgency. Scammers often use timers to pressure people into making quick decisions without considering potential risks.
        </p>
        <p>
          <strong>Suspicious Button Labels:</strong> Options like "I CLAIM" versus "NO I DON’T WANT FREE MONEY" are designed to manipulate emotions. Genuine websites use clear, neutral options, not emotional prompts.
        </p>
        <p>
          <strong>No Source or Company Information:</strong> Legitimate sweepstakes or rewards are hosted by reputable companies with clear branding. This popup lacks any legitimate company name, making it anonymous and untrustworthy.
        </p>
        <p>
          <strong>Potential for Phishing and Malware:</strong> Clicking these popups often leads to phishing sites that ask for personal information or initiate harmful downloads.
        </p>
        <p>
          <strong>How to Stay Safe:</strong> Avoid clicking on popups with exaggerated promises, countdowns, and unclear sources. Always verify promotions directly through official websites and be cautious with any unsolicited "winning" notifications.
        </p>
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

export default LandingPageOne;
