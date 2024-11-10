import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import '../../live.css';

import step1 from './images/app.jpg';
import step2 from './images/settings.jpeg';
import step3 from './images/option.jpeg';
import step4 from './images/lang.jpeg';

import hoverSoundPath from '../sounds/hover.mp3';
import clickSoundPath from '../sounds/click-button.mp3';

const steps = [
  {
    image: step1,
    description: 'Open Setting app on your device.',
    highlightArea: { top: '30%', left: '28%', width: '20%', height: '10%' },
    arrowStyle: { top: '32%', left: '48%', transform: 'translate(-50%, 0)' },
    info: 'Tap on the Settings icon to open the app.',
  },
  {
    image: step2,
    description: 'Tap on the Additional Settings option.',
    highlightArea: { top: '65%', left: '0%', width: '100%', height: '8%' },
    arrowStyle: { top: '64%', left: '92%', transform: 'translate(-50%, 0)' },
    info: 'Search for Additional Settings and Tap on it.',
  },
  {
    image: step3,
    description: 'Tap on the Language & Region button.',
    highlightArea: { top: '20.5%', left: '3%', width: '75%', height: '5%' },
    arrowStyle: { top: '18%', left: '78%', transform: 'translate(-50%, 0)' },
    info: 'Tap on the Language & Region option.',
  },
  {
    image: step4,
    description: 'Choose your preferred Language.',
    highlightArea: { top: '24%', left: '4%', width: '92%', height: '8%' },
    arrowStyle: { top: '24%', left: '98%', transform: 'translate(-50%, 0)' },
    info: 'Select any Language. Your Language has been set.',
  },
];

const Ringtone = () => {
  const { option } = useParams();
  const navigate = useNavigate(); // For navigation
  const [currentStep, setCurrentStep] = useState(0);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const hoverAudio = new Audio(hoverSoundPath);
  const clickAudio = new Audio(clickSoundPath);
  const utteranceRef = React.useRef(null); // Use a ref to keep track of the utterance

  const initializeAudio = () => {
    hoverAudio.load();
    clickAudio.load();
    setIsAudioInitialized(true);
  };

  const playClickSound = () => {
    if (isAudioInitialized) {
      clickAudio.currentTime = 0;
      clickAudio.play().catch((err) => {
        console.error('Click sound playback failed:', err);
      });
    }
  };

  const playHoverSound = () => {
    if (isAudioInitialized) {
      hoverAudio.currentTime = 0;
      hoverAudio.play().catch((err) => {
        console.error('Hover sound playback failed:', err);
      });
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      navigate(`/livetutorial`); // Navigate back to the options page after completing all steps
    }
  };

  const handlePrev = () => {
    playClickSound();
    setCurrentStep((prevStep) => (prevStep === 0 ? steps.length - 1 : prevStep - 1));
  };

  const handleReplay = () => {
    playClickSound();
    setCurrentStep(0);
  };
  const handleHome = () => {
    navigate('/');
  }

  const speakText = (text) => {
    // Stop any ongoing speech
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const { image, description, highlightArea, arrowStyle, info } = steps[currentStep];

  useEffect(() => {
    window.addEventListener('click', initializeAudio, { once: true });
    speakText(info); 
    return () => {
      window.removeEventListener('click', initializeAudio);
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentStep]); 

  return (
    <div className="guide-container">
      <h2>How to Set Language in your in Mobile</h2>

      <div className="image-container1">
        <motion.img
          key={currentStep}
          src={image}
          alt={`Step ${currentStep + 1}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="step-image"
        />

        <motion.div
          className="highlight-box"
          style={{
            position: 'absolute',
            top: highlightArea.top,
            left: highlightArea.left,
            width: highlightArea.width,
            height: highlightArea.height,
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
          onMouseEnter={playHoverSound}
          onClick={handleNext}
          whileHover={{ scale: 1.05 }} 
          transition={{ duration: 0.2 }} 
        ></motion.div>

        <div
          className="arrow"
          style={{
            position: 'absolute',
            top: arrowStyle.top,
            left: arrowStyle.left,
            transform: arrowStyle.transform,
            zIndex: 10,
          }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: 'rotate(180deg)',
              transformOrigin: 'center',
            }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>

          <motion.div
            style={{
              position: 'absolute',
              top: '12px',
              left: '60px',
              backgroundColor: 'rgba(255, 255, 0, 0.8)',
              color: 'black',
              padding: '5px 10px',
              borderRadius: '5px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              whiteSpace: 'nowrap',
            }}
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {info}
          </motion.div>
        </div>
      </div>

      <p>{description}</p>
      <div className="info-text-container"> 
        <p className="info-text">{info}</p> 
      </div>

      <div className="button-container">
        <motion.button
          className="prev-button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Previous
        </motion.button>
        <motion.button
          className="replay-button"
          onClick={handleReplay}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Replay
        </motion.button>
        <motion.button
          className="next-button"
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === steps.length - 1 ? 'Return to Options' : 'Next'}
        </motion.button>

        <motion.button
          className="speak-button"
          onClick={() => speakText(info)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Hear Instructions
        </motion.button>
        <motion.button
          className="home-button"
          onClick={handleHome}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Go to Homepage
        </motion.button>
      </div>
    </div>
  );
};

export default Ringtone;
