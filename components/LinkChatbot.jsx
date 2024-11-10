import React, { useState } from 'react';
import './LinkChatbot.css';
import clickSound from '../assets/click-sound.mp3'; // Ensure the path to the sound file is correct

const questions = [
  {
    text: "Does the message ask for personal information like your full name, ID number, or social security number or Aadharcard number ?",
    riskExplanation: "(Requests for personal data are a common sign of scams.)",
    weight: 3
  },
  {
    text: "Does it request any financial information, such as bank account details or credit card numbers?",
    riskExplanation: "(Providing financial data can lead to identity theft or fraud.)",
    weight: 5
  },
  {
    text: "Is there a sense of urgency, asking you to act quickly to avoid consequences or seize a limited offer?",
    riskExplanation: "(Scams often create urgency to pressure people into making quick decisions without proper scrutiny.)",
    weight: 2
  },
  {
    text: "Does the message prompt you to download unknown files or software?",
    riskExplanation: "(Downloading unknown files or software can lead to malware infections on your device.)",
    weight: 3
  },
  {
    text: "Are there links or attachments, especially ones you weren’t expecting?",
    riskExplanation: "(Unsolicited links and attachments can contain malware or direct you to phishing websites.)",
    weight: 4
  },
  {
    text: "Is the sender's phone number or email unfamiliar or masked by a vague name?",
    riskExplanation: "(Unfamiliar or masked sender information often indicates potential spoofing or phishing attempts.)",
    weight: 3
  },
  {
    text: "Does the message contain spelling, grammar errors, or poor formatting?",
    riskExplanation: "(Poor grammar and formatting are common signs of fraudulent messages.)",
    weight: 3
  },
  {
    text: "Are there any promises of a reward, prize, or lottery you didn't participate in?",
    riskExplanation: "(Unexpected rewards or prizes are often used to lure people into scams.)",
    weight: 4
  },
  {
    text: "Does the message ask you to verify or update sensitive information like passwords or security questions?",
    riskExplanation: "(Legitimate services typically don't request sensitive data through unsolicited messages.)",
    weight: 4
  },
  {
    text: "Are there any warnings about unusual login activity or attempts to access your account?",
    riskExplanation: "(Fraudulent messages may fake security alerts to trick users into revealing their credentials.)",
    weight: 5
  },
  {
    text: "Is there a request to forward, share, or spread the message among your contacts?",
    riskExplanation: "(Scammers often encourage sharing to increase the spread of their messages.)",
    weight: 3
  },
  {
    text: "Does the message impersonate a trusted source (e.g., government agency) but with minor inconsistencies?",
    riskExplanation: "(Fake messages may mimic trusted organizations but often have minor errors or inconsistencies.)",
    weight: 4
  },
  {
    text: "Does it contain links with unusual or mismatched URLs, especially ones you wouldn’t expect from the sender?",
    riskExplanation: "(Unusual or mismatched URLs can lead to phishing sites.)",
    weight: 4
  },
  {
    text: "Are you asked to pay a small fee or cover expenses for something of high value?",
    riskExplanation: "(Requests for small payments in exchange for high-value offers are common scam tactics.)",
    weight: 3
  },
  {
    text: "Is the message unexpectedly offering you a refund, rebate, or tax adjustment?",
    riskExplanation: "(Unexpected refund offers often aim to trick users into providing personal information or payments.)",
    weight: 4
  }
];


const LinkChatbot = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const clickSoundEffect = new Audio(clickSound);

  const handleAnswer = (isYes) => {
    clickSoundEffect.play();

    // Increase score based on weight if the answer is 'Yes'
    if (isYes) setScore(score + questions[currentQuestion].weight);

    // Proceed to the next question or show the result
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const renderResult = () => {
    if (score >= 15) {
      return (
        <p>
          This Link is extremely likely to be a scam based on your responses. Do not engage further and consider reporting it.
        </p>
      );
    } else if (score >= 12 && score < 15) {
      return (
        <p>
          This Link is very likely a scam. Exercise extreme caution and avoid responding or clicking any links.
        </p>
      );
    } else if (score >= 9 && score < 12) {
      return (
        <p>
          There are strong indications this Link could be a scam. Verify its authenticity before interacting further.
        </p>
      );
    } else if (score >= 6 && score < 9) {
      return (
        <p>
          Some warning signs suggest this Link might be a scam. Proceed with caution and investigate further if unsure.
        </p>
      );
    } else if (score >= 3 && score < 6) {
      return (
        <p>
          This Link does not exhibit major signs of being a scam, but some minor indicators suggest staying alert.
        </p>
      );
    } else {
      return (
        <p>
          Based on your responses, this link appears to have a low likelihood of being a scam. Nonetheless, always exercise general caution.
        </p>
      );
    }
  };
  

  return (
    <div className="chatbot-container">
      <h2>Scam Detective</h2>
      {showResult ? (
        renderResult()
      ) : (
        <div>
          <p>{questions[currentQuestion].text}</p>
          <p className="risk-explanation">{questions[currentQuestion].riskExplanation}</p>
          <div className="button-group">
            <button onClick={() => handleAnswer(true)}>Yes</button>
            <button onClick={() => handleAnswer(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkChatbot;