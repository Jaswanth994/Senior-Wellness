import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import './lv2.css';

// Import images
import step1 from './images/map.jpg';
import step2 from './images/maps.jpg';
import step3 from './images/search.jpg';
import step4 from './images/location.jpg';
import step5 from './images/direction.jpg';
import step6 from './images/start.jpg';

// Import sounds
import hoverSoundPath from '../sounds/hover.mp3';
import clickSoundPath from '../sounds/click-button.mp3';

const steps = [
    {
      image: step1,
      description: 'Open Google Maps on your device.',
      highlightArea: { top: '50%', left: '50%', width: '30%', height: '10%' },
      arrowStyle: { top: '48%', left: '60%', transform: 'translate(-50%, 0)' },
      info: 'Tap on the Google Maps icon to open the app.',
    },
    {
      image: step2,
      description: 'Tap on the Search Bar for Searching Places.',
      highlightArea: { top: '10%', left: '50%', width: '60%', height: '8%' },
      arrowStyle: { top: '12%', left: '80%', transform: 'translate(-50%, 0)' },
      info: 'Type the location you want to visit in the search bar and press enter.',
    },
    {
      image: step3,
      description: 'Tap on the Directions button.',
      highlightArea: { top: '85%', left: '50%', width: '15%', height: '7%' },
      arrowStyle: { top: '84%', left: '50%', transform: 'translate(-50%, 0)' },
      info: 'Tap on "Directions" to get route options to your location.',
    },
    {
      image: step4,
      description: 'Choose your preferred transportation mode.',
      highlightArea: { top: '40%', left: '10%', width: '80%', height: '20%' },
      arrowStyle: { top: '45%', left: '90%', transform: 'translate(-50%, 0)' },
      info: 'Select between driving, public transport, cycling, or walking as your preferred transport method.',
    },
    {
      image: step5,
      description: 'Press Start to begin navigation.',
      highlightArea: { top: '92%', left: '50%', width: '15%', height: '8%' },
      arrowStyle: { top: '90%', left: '50%', transform: 'translate(-50%, 0)' },
      info: 'Tap on "Start" to begin turn-by-turn navigation to your destination.',
    },
    {
        image: step6,
      description: 'You the directions for the desired location.',
      highlightArea: { top: '92%', left: '50%', width: '15%', height: '8%' },
      arrowStyle: { top: '90%', left: '50%', transform: 'translate(-50%, 0)' },
      info: 'The Directions will be shown on the map..',
    },
  ];
  
  const MapsGuide = () => {
    const { option } = useParams();
    const navigate = useNavigate(); // For navigation
    const [currentStep, setCurrentStep] = useState(0);
    const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  
    const hoverAudio = new Audio(hoverSoundPath);
    const clickAudio = new Audio(clickSoundPath);
  
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
        // Navigate back to the options page after completing all steps
        navigate(`/`); // Updated path
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
  
    const speakText = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    };
  
    const { image, description, highlightArea, arrowStyle, info } = steps[currentStep];
  
    useEffect(() => {
      window.addEventListener('click', initializeAudio, { once: true });
      speakText(info); // Speak the info text whenever the step changes
      return () => {
        window.removeEventListener('click', initializeAudio);
      };
    }, [currentStep]); // Add currentStep to the dependency array to call speakText whenever the step changes
  
    return (
      <div className="guide-container">
        <h2>How to Share Your Location in WhatsApp</h2>
  
        <div className="image-container">
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
            whileHover={{ scale: 1.05 }} // Slightly enlarge when hovered
            transition={{ duration: 0.2 }} // Transition duration for hover
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
        <p className="info-text">{info}</p>
  
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
        </div>
      </div>
    );
  };
  
  export default MapsGuide;