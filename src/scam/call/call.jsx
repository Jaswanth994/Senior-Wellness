  import React, { useState, useEffect, useRef } from 'react';
  import { motion } from 'framer-motion';
  import Lottie from 'react-lottie';
  import { useNavigate } from 'react-router-dom';
  import './call.css';
  import hackerAnimationData from './images/Scammer.json';
  import userImage from './images/OldMan.json';
  import ringtone from './sounds/ring.wav';



  const ChatScamPrevention = () => {
    const navigate = useNavigate();
    const [isIntroActive, setIsIntroActive] = useState(true);
    const [isCallActive, setIsCallActive] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState({});
    const [conversationOver, setConversationOver] = useState(false);

    const ringtoneAudio = useRef(new Audio(ringtone));

    const questions = [
      
        { text: "Hello! This is from your bank’s security department. Is this John?", options: ["Yes, speaking", "No"], field: 'identity' },
        { text: "We detected suspicious transactions. Could you confirm your recent purchases over $500?", options: ["Yes, confirm", "I’m not sure"], field: 'purchase' },
        { text: "To validate your identity, could you please confirm your phone number?", options: ["Provide number", "Decline"], field: 'phone' },
        { text: "Thank you. We need the last four digits of your social security number for verification.", options: ["Give digits", "Decline"], field: 'ssn' },
        { text: "Our system flagged your account for potential security risks. May I have the last 4 digits of your bank account?", options: ["Provide last 4 digits", "Decline"], field: 'accountDigits' },
        { text: "To secure your account, please provide your full credit card number.", options: ["Give card number", "Decline"], field: 'card' },
        { text: "We need to re-verify your home address to send a new debit card. Could you provide it?", options: ["Provide address", "Decline"], field: 'address' },
        { text: "For additional security, please tell us the PIN associated with your debit card.", options: ["Provide PIN", "Decline"], field: 'pin' },
        { text: "Would you like to set up a temporary password? Just confirm your mother’s maiden name.", options: ["Provide maiden name", "Decline"], field: 'maidenName' },
      
    ];

    const startCall = () => {
      setIsIntroActive(false);
      setIsCallActive(true);
      ringtoneAudio.current.loop = true;
      ringtoneAudio.current.play();
    };

    const startChat = () => {
      setIsCallActive(false);
      setIsChatActive(true);
      ringtoneAudio.current.pause();
      ringtoneAudio.current.currentTime = 0;
    };

    const handleOptionClick = (option, field) => {
      setChatHistory((prev) => [...prev, { sender: 'user', text: option }]);
      setUserResponses((prev) => ({ ...prev, [field]: option }));
      setShowOptions(false);
      setIsTyping(true);
      window.speechSynthesis.cancel(); // Stop the current speech before the next one
      setTimeout(() => {
        setIsTyping(false);
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 1500);
    };

    const speak = (text) => {
      window.speechSynthesis.cancel(); // Stop any ongoing speech before speaking a new text
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
      if (isChatActive && currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        setTimeout(() => {
          setChatHistory((prev) => [...prev, { sender: 'hacker', text: question.text }]);
          speak(question.text);
          setIsTyping(false);
          setShowOptions(true);
        }, 1500);
      } else if (isChatActive) {
        const wasScammed = Object.values(userResponses).some((response) => response.startsWith("Give"));
        const resultMessage = wasScammed ? "You were scammed!" : "You avoided the scam!";
        setChatHistory((prev) => [...prev, { sender: 'system', text: resultMessage }]);
        speak(resultMessage);
        setConversationOver(true);
      }
    }, [isChatActive, currentQuestionIndex]);

    const handleHome = () => {
      window.speechSynthesis.cancel(); // Stop any ongoing speech when navigating away
      navigate('/');
    };

    return (
      <div className="chat-container">
        
        <motion.button className="home-button" onClick={handleHome}>
          Go to Homepage
        </motion.button>
        {isIntroActive ? (
          <div className="intro-screen">
            <h2>Welcome to the Call Scam Prevention Simulation</h2>
            <p>In this simulation, you'll experience how scammers try to trick people over the phone. Let's see if you can spot the scam!</p>
            <button className="start-simulation-button" onClick={startCall}>Start Simulation</button>
          </div>
        ) : isCallActive ? (
          <div className="call-screen">
            <p className="caller-id">Incoming call from Unknown Number</p>
            <div className="ringing-animation">📞 ...</div>
            <button className="answer-button" onClick={startChat}>
              Answer
            </button>
          </div>
        ) : conversationOver ? (
          <div className="summary-container">
            <h2>Scam Summary</h2>
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Your Response</th>
                  <th>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={index}>
                    <td>{question.text}</td>
                    <td>{userResponses[question.field] || "No response"}</td>
                    <td>{userResponses[question.field]?.startsWith("Give") ? "High" : "Low"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="result-message">
              {Object.values(userResponses).some((response) => response.startsWith("Give")) ? "You were scammed!" : "You avoided the scam!"}
            </p>
          </div>
        ) : (
          <div className="chat-content">
            <div className="hacker-section">
              <Lottie 
                options={{ animationData: hackerAnimationData, loop: true, autoplay: true }}
                height={200} width={200}
              />
              {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].sender === 'hacker' && (
                <motion.div className="chat-bubble hacker-cloud" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <p>{chatHistory[chatHistory.length - 1].text}</p>
                </motion.div>
              )}
              {isTyping && (
                <div className="chat-bubble hacker-cloud typing">
                  <span className="typing-dots">...</span>
                </div>
              )}
            </div>
    
            <div className="user-section">
            <Lottie 
                options={{ animationData: userImage, loop: true, autoplay: true }}
                height={200} width={200}
              />
              {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].sender === 'user' && (
                <motion.div className="chat-bubble user-cloud" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <p>{chatHistory[chatHistory.length - 1].text}</p>
                </motion.div>
              )}
              {showOptions && (
                <div className="options-container1">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <button key={index} className="option-button" onClick={() => handleOptionClick(option, questions[currentQuestionIndex].field)}>
                      {option}
                    </button>
                  ))}
                </div>
              )}
            
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ChatScamPrevention;
