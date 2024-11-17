import React, { useState, useRef } from 'react';
import './LinkChatbot.css';
import clickSound from '../assets/click-sound.mp3';
import photo from '../assets/scam-prevention-bg.png';
import { useNavigate } from 'react-router-dom';
import { color } from 'framer-motion';

const questions = [
  {
    text: "Does the message ask for personal information like your full name, ID number, or social security number or Aadharcard number?",
    riskExplanation: "(Requests for personal data are a common sign of scams.)",
    weight: 3,
  },
  {
    text: "Does it request any financial information, such as bank account details or credit card numbers?",
    riskExplanation: "(Providing financial data can lead to identity theft or fraud.)",
    weight: 5,
  },
  {
    text: "Is there a sense of urgency, asking you to act quickly to avoid consequences or seize a limited offer?",
    riskExplanation: "(Scams often create urgency to pressure people into making quick decisions without proper scrutiny.)",
    weight: 2,
  },
  // ... add remaining questions in the same format
];

const LinkChatbot = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const clickSoundEffect = useRef(new Audio(clickSound)); // useRef to persist the audio instance

  const handleAnswer = (isYes) => {
    clickSoundEffect.current.play(); // Play sound on click
    if (isYes) setScore(score + questions[currentQuestion].weight);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const renderResult = () => {
    if (score >= 15) {
      return <p>This link is extremely likely to be a scam. Do not engage further and consider reporting it.</p>;
    } else if (score >= 12) {
      return <p>This link is very likely a scam. Exercise extreme caution and avoid responding or clicking any links.</p>;
    } else if (score >= 9) {
      return <p>There are strong indications this link could be a scam. Verify its authenticity before interacting further.</p>;
    } else if (score >= 6) {
      return <p>Some warning signs suggest this link might be a scam. Proceed with caution and investigate further if unsure.</p>;
    } else if (score >= 3) {
      return <p>This link does not exhibit major signs of being a scam, but some minor indicators suggest staying alert.</p>;
    } else {
      return <p>Based on your responses, this link appears to have a low likelihood of being a scam. Nonetheless, always exercise general caution.</p>;
    }
  };

  const home = () => {
    navigate('/');
  };

  return (
    <div
      className="chatbot-background"
      // style={{
      //   backgroundImage: `url(${photo})`,
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   minHeight: '100vh',
      //   // opacity:0.66,
      // }}
    >
      <div className="chatbot-container" style={{opacity: 1}} >
        <button className="home1" onClick={home}>Homepage</button>
        <h2>Scam Detective</h2>
        {showResult ? (
          renderResult()
        ) : (
          <div>
            <p>{questions[currentQuestion].text}</p>
            <p className="risk-explanation">{questions[currentQuestion].riskExplanation}</p>
            <div className="button-group">
              <button className='yes' onClick={() => handleAnswer(true)}>Yes</button>
              <button className="no" onClick={() => handleAnswer(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkChatbot;
