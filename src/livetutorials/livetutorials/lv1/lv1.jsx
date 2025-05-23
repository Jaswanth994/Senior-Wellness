    import React, { useState, useEffect, useRef } from 'react';
    import { motion } from 'framer-motion';
    import { useNavigate, useParams } from 'react-router-dom';
    import '../../live.css';


    // Import images
    import step1 from './images/homescreen.jpg';
    import step2 from './images/whatsapp-home.jpg';
    import step3 from './images/whatsapp-chat.jpg';
    import step4 from './images/attachment-menu.jpg';
    import step5 from './images/location.jpg';
    import step6 from './images/final.jpg';

    // Import sounds
    import hoverSoundPath from '../sounds/hover.mp3';
    import clickSoundPath from '../sounds/click-button.mp3';
    import Header from '../../../Header.jsx';

    const steps = [
      {
        image: step1,
        description: 'Open WhatsApp on your device.',
        highlightArea: { top: '49.5%', left: '50%', width: '20%', height: '10%' },
        arrowStyle: { top: '48.5%', left: '70%', transform: 'translate(-50%, 0)' },
        info: 'Tap on the WhatsApp icon to open the app.',
      },
      {
        image: step2,
        description: 'Navigate to the chat where you want to share your location.',
        highlightArea: { top: '45%', left: '0%', width: '98%', height: '8%' },
        arrowStyle: { top: '44%', left: '92%', transform: 'translate(0, 0)' },
        info: 'Select the chat from the chat list.',
      },
      {
        image: step3,
        description: 'Tap on the Attach (paperclip) icon at the bottom right.',
        highlightArea: { top: '93.5%', left: '54%', width: '10%', height: '5%' },
        arrowStyle: { top: '91.5%', left: '64%', transform: 'translate(-50%, 0)' },
        info: 'Tap on the paperclip icon to attach your location.',
      },
      {
        image: step4,
        description: 'Select "Location" from the menu.',
        highlightArea: { top: '70%', left: '40%', width: '20%', height: '10%' },
        arrowStyle: { top: '70%', left: '58.5%', transform: 'translate(-50%, -50%)' },
        info: 'Tap on "Location" to proceed.',
      },
      {
        image: step5,
        description: '"Send your current location".',
        highlightArea: { top: '52%', left: '0%', width: '100%', height: '12%' },
        arrowStyle: { top: '54%', left: '100%', transform: 'translate(-50%, -50%)' },
        info: ' Send the current location.',
      },
      {
        image: step6,
        description: 'This is how it appears after sharing current location.',
        highlightArea: { top: '74%', left: '35%', width: '60%', height: '20%' },
        arrowStyle: { top: '80%', left: '100%', transform: 'translate(-50%, -50%)' },
        info: 'This is how it appears after sharing current location.',
      },
    ];

    const LocationSharingGuide = () => {
      const { option } = useParams();
      const navigate = useNavigate(); // For navigation
      const [currentStep, setCurrentStep] = useState(0);
      const [isAudioInitialized, setIsAudioInitialized] = useState(false);

      const hoverAudio = new Audio(hoverSoundPath);
      const clickAudio = new Audio(clickSoundPath);
      
      // Create a ref for the speech synthesis utterance
      const utteranceRef = useRef(null);

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
          navigate(`/livetutorial`); // Navigate back to options page
        }
      };
      const handleHome = () => {
        navigate('/');
      }

      const handlePrev = () => {
        playClickSound();
        setCurrentStep((prevStep) => (prevStep === 0 ? steps.length - 1 : prevStep - 1));
      };

      const handleReplay = () => {
        playClickSound();
        setCurrentStep(0);
      };

      const speakText = (text) => {
      
        if (utteranceRef.current) {
          speechSynthesis.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance; 
        speechSynthesis.speak(utterance);
      };

      const { image, description, highlightArea, arrowStyle, info } = steps[currentStep];

      useEffect(() => {
        window.addEventListener('click', initializeAudio, { once: true });
        speakText(info); // Speak the info text whenever the step changes
        return () => {
          window.removeEventListener('click', initializeAudio);
          speechSynthesis.cancel(); // Stop any ongoing speech synthesis when unmounting
        };
      }, [currentStep]); // Call speakText when currentStep changes

      return (
        <div>
          <Header />
          <h2 className='hd'>How to Share Your Location in WhatsApp</h2>
        <div className="guide-container">
          <div className='contan'>
          
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
              {currentStep < steps.length - 1 ? 'Next' : 'Go to the options page'}
            </motion.button>
            <motion.button
              className="speak-button"
              onClick={() => speakText(info)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Hear Instructions
            </motion.button>
            {/* <motion.button
              className="home-button"
              onClick={handleHome}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Go to Homepage
            </motion.button> */}
          </div>
        </div>
        </div>
      );
    };

    export default LocationSharingGuide;


