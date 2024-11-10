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
      <h1>Why This Might Be a Scam Page</h1>
      <div className="article-content">
        <p>
          This payment page shows several warning signs common in online scams. Here’s why it’s likely fraudulent:
        </p>
        <ul>
          <li><strong>Threatening Language:</strong> The page warns, “Enter Your Card Details otherwise Police will Come to Your Door step Immediately PAY FINE!!!” Legitimate companies don’t use threats to coerce payment.</li>
          <li><strong>Poor Grammar and Formatting:</strong> The strange capitalization and excessive exclamation marks, like “PAY FINE!!!,” are unprofessional. Reputable organizations don’t make these mistakes.</li>
          <li><strong>Unusual Button Labels:</strong> Instead of a neutral option like “Submit,” this page uses “OK I WILL PAY IMMEDIATELY,” which pressures users to act without thinking. Real payment pages avoid such manipulative language.</li>
          <li><strong>Unverified Payment Logos:</strong> Although it displays logos of trusted providers like Visa, these can be easily faked. Always confirm the URL belongs to a reputable site before sharing financial info.</li>
          <li><strong>Lack of Security Features:</strong> Legitimate payment sites use HTTPS (padlock icon) to protect data. This page doesn’t show such security indicators, making any entered information vulnerable.</li>
          <li><strong>Missing Contact Info:</strong> No company or contact details are provided. Genuine businesses make it easy to reach them for verification.</li>
        </ul>
        <p>
          <strong>Protect Yourself:</strong> Verify the URL, look for HTTPS, be wary of threats, and contact the company directly if unsure.
        </p>
      </div>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

export default LandingPageOne;
