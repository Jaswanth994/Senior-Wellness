import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import './lv2.css';

// Import images
import step1 from './images/map.jpg';
import step2 from './images/maps.jpg';
import step3 from './images/location.jpg';
import step4 from './images/direction.jpg';
import step5 from './images/direction.jpg';
import step6 from './images/start.jpg';

// Import sounds
import hoverSoundPath from '../sounds/hover.mp3';
import clickSoundPath from '../sounds/click-button.mp3';

const steps = [
    {
      image: step1,
      description: 'Open Google Maps on your device.',
      highlightArea: { top: '48%', left: '72%', width: '20%', height: '10%' },
      arrowStyle: { top: '48%', left: '94%', transform: 'translate(-50%, 0)' },
      info: 'Tap on the Google Maps icon to open the app.',
    },
    {
      image: step2,
      description: 'Tap on the Search Bar for Searching Places.',
      highlightArea: { top: '4%', left: '0%', width: '100%', height: '8%' },
      arrowStyle: { top: '4%', left: '100%', transform: 'translate(-50%, 0)' },
      info: 'Type the location you want to visit in the search bar and press enter.',
    },
    {
      image: step3,
      description: 'Tap on the Directions button.',
      highlightArea: { top: '67%', left: '3%', width: '34%', height: '7%' },
      arrowStyle: { top: '66%', left: '38%', transform: 'translate(-50%, 0)' },
      info: 'Tap on "Directions" to get route options to your location.',
    },
    {
      image: step4,
      description: 'Choose your preferred transportation mode.',
      highlightArea: { top: '76%', left: '4%', width: '92%', height: '6%' },
      arrowStyle: { top: '75%', left: '98%', transform: 'translate(-50%, 0)' },
      info: 'Select between driving, public transport, cycling, or walking as your preferred transport method.',
    },
    {
      image: step5,
      description: 'Press Start to begin navigation.',
      highlightArea: { top: '93%', left: '4%', width: '22%', height: '6%' },
      arrowStyle: { top: '91%', left: '28%', transform: 'translate(-50%, 0)' },
      info: 'Tap on "Start" to begin turn-by-turn navigation to your destination.',
    },
    {
        image: step6,
        description: 'Jounery Started',
        highlightArea: { top: '50%', left: '100%', width: '22%', height: '6%' },
        arrowStyle: { top: '49%', left: '100%', transform: 'translate(-50%, 0)' },
        info: 'Your Journey has started',
      },
];

const MapsGuide = () => {
    const { option } = useParams();
    const navigate = useNavigate(); // For navigation
    const [currentStep, setCurrentStep] = useState(0);
    const [isAudioInitialized, setIsAudioInitialized] = useState(false);
    
    const hoverAudio = new Audio(hoverSoundPath);
    const clickAudio = new Audio(clickSoundPath);
    const currentUtterance = useRef(null); // Reference to the current utterance

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
        // Cancel the previous utterance if it exists
        if (currentUtterance.current) {
            speechSynthesis.cancel();
        }
        
        // Create a new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        currentUtterance.current = utterance; // Store the current utterance
        
        // Speak the utterance
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
            <h2>How to Use Google Maps</h2>

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
