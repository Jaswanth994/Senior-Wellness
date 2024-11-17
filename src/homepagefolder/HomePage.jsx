import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Hero from './Hero';
import Card from './Card';
import Footer from '../Footer';
import animationData from '../assets/Animationscam.json';
import animationtuto from '../assets/Animationtut.json';
import animationtech from '../assets/AnimationTech.json';
import './HomePage.css';
import '../App.css';

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Helper function to load a script
    const loadScript = (src, onLoad, onError) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      script.onerror = onError;
      document.body.appendChild(script);
      return script;
    };

    // Load scripts sequentially with error handling
    const script1 = loadScript(
      'https://cdn.botpress.cloud/webchat/v2.2/inject.js',
      () => {
        loadScript(
          'https://files.bpcontent.cloud/2024/10/31/11/20241031115407-95AM147T.js',
          () => console.log('Chatbot scripts loaded successfully'),
          () => console.error('Failed to load second chatbot script')
        );
      },
      () => console.error('Failed to load first chatbot script')
    );

    // Cleanup function to remove scripts on component unmount
    return () => {
      document.body.removeChild(script1);
    };
  }, []);

  const [showPopup, setShowPopup] = useState(true);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);

  const speakingRef = useRef(false);
  const utteranceRef = useRef(new SpeechSynthesisUtterance());
  const speed = 1;

  const handleCardClick = (category, score) => {
    navigate('/article-page', { state: { category, score } });
  };
  useEffect(() => {
    const handleMouseOver = (e) => {
      if (!isSpeakingEnabled) return;

      const mousePos = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (mousePos && mousePos.startContainer.nodeType === Node.TEXT_NODE) {
        const textNode = mousePos.startContainer;
        const sentence = extractSentence(textNode.textContent, mousePos.startOffset);

        if (sentence && !speakingRef.current) {
          speakingRef.current = true;
          speakText(sentence);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseOver);
    return () => {
      document.removeEventListener('mousemove', handleMouseOver);
    };
  }, [isSpeakingEnabled]);

  const extractSentence = (text, offset) => {
    const beforeText = text.slice(0, offset);
    const afterText = text.slice(offset);

    const sentenceStart = beforeText.lastIndexOf('.') !== -1 ? beforeText.lastIndexOf('.') + 1 : 0;
    const sentenceEnd = afterText.indexOf('.') !== -1 ? offset + afterText.indexOf('.') + 1 : text.length;

    const sentence = text.slice(sentenceStart, sentenceEnd).trim();
    return sentence;
  };

  const speakText = (text) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    utteranceRef.current.text = text;
    utteranceRef.current.rate = speed;

    utteranceRef.current.onend = () => {
      speakingRef.current = false;
    };

    speechSynthesis.speak(utteranceRef.current);
  };

  const handleSpeakingToggle = () => {
    setIsSpeakingEnabled(!isSpeakingEnabled);
  };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false);
        }, 3000); // Popup will disappear after 3 seconds
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <div className="App">
            {/* Header Section */}
            <Header />

            {/* Hero Section */}
            <Hero />

      {/* <button 
        onClick={handleSpeakingToggle} 
        style={{ marginTop: '40px', marginBottom: '0.5px', width: '200px', height: '50px' }}
      >
        {isSpeakingEnabled ? 'Disable Speaking' : 'Enable Speaking'}
      </button> */}

       <div className='Headings'>
        <h22>Improve Your Tech Knowledge </h22>
      </div>

      <section className="section">
        <Card 
          animationData={animationtech} 
          title="Tech Help" 
          description="Get expert assistance with your tech-related questions and device setup." 
          link="/quizhome" 
        />
        <Card 
          animationData={animationData} 
          title="Scam Prevention" 
          description="Learn essential strategies to ensure a safe and healthy living environment for seniors." 
          link="/scamhome" 
        />
        <Card 
          animationData={animationtuto} 
          title="Live Tutorials" 
          description="Join interactive sessions to learn new skills in real-time with expert guidance." 
          link="/livetutorial" 
        />
      </section>

      <div className='Headings'>
        <h22>Related Articles and Blogs</h22>
      </div>

      <section className="section">
      <div
        onClick={() => handleCardClick('web', 1)}
        style={{ cursor: 'pointer' }}
      >
        <Card
          title="Understanding Tech"
          description="A comprehensive guide to understanding modern technology."
          // link="/understanding-tech"
        />
      </div>
      <div
        onClick={() => handleCardClick('android', 0)}
        style={{ cursor: 'pointer' }}
      >
        <Card
          title="Common Scams"
          description="Learn about the most common scams and how to avoid them."
          // link="/common-scams"
        />
      </div>
      <div
        onClick={() => handleCardClick('desktop', 0)}
        style={{ cursor: 'pointer' }}
      >
        <Card
          title="Mastering Online Banking"
          description="Tips and tricks to efficiently manage your online banking."
          // link="/online-banking"
        />
      </div>
    </section>

      <Footer />
    </div>
  );
};

export default Homepage;

