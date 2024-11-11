import React, { useEffect, useState, useRef } from 'react';
import animationData from '../assets/Animationscam.json';
import animationtuto from '../assets/Animationtut.json';
import animationtech from '../assets/AnimationTech.json';


import Header from '../Header';
import Hero from './Hero';
import Card from './Card';
import Footer from '../Footer'; 
import './HomePage.css';
import '../App.css'; // Ensure the CSS file is linked


const Homepage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);
    
    const speakingRef = useRef(false);
    const utteranceRef = useRef(new SpeechSynthesisUtterance());
    const speed = 1;  // Adjust the speed as per your requirement

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
    useEffect(() => {
      // Check if Botpress Webchat is available and initialize it
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          hostUrl: 'https://cdn.botpress.cloud/webchat/v2.2',
          botId: 'YOUR_BOT_ID',
          // Optional configurations
          // extraStylesheet: 'path-to-your-custom-styles.css',
          // showMessageDate: true,
        });
      }
    }, []);
     

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
    
      {/* Hero Section with just the image */}
      <Hero /> 

      {/* Main Cards Section */}
      <section className="section">
      <button onClick={handleSpeakingToggle} style={{ marginBottom: '10px' }}>
                {isSpeakingEnabled ? 'Disable Speaking' : 'Enable Speaking'}
            </button>
        <Card 
          animationData={animationtech} 
          title="Tech Help" 
          description="Get expert assistance with your tech-related questions and device setup." 
          link="/quizhome"  // Add links for routing
        />
        <Card 
          animationData={animationData} 
          title="Scam Prevention" 
          description="Learn essential strategies to ensure a safe and healthy living environment for seniors." 
          link="/scam-prevention"  // Add links for routing
        />
        <Card 
          animationData={animationtuto} 
          title="Live Tutorials" 
          description="Join interactive sessions to learn new skills in real-time with expert guidance." 
          link="/livetutorial"  // Add links for routing
        />
      </section>

      {/* Latest Articles & Vlogs Section */}
      <div className='Headings'>
        <h2>Related Articles and Blogs</h2>
      </div>

      <section className="section">
        <Card 
          title="Understanding Tech" 
          description="A comprehensive guide to understanding modern technology." 
          link="/understanding-tech"  // Add links for routing
        />
        <Card 
          title="Common Scams" 
          description="Learn about the most common scams and how to avoid them." 
          link="/common-scams"  // Add links for routing
        />
        <Card 
          title="Mastering Online Banking" 
          description="Tips and tricks to efficiently manage your online banking." 
          link="/online-banking"  // Add links for routing
        />
         {/* <div className="homepage">
      <button onClick={() => window.botpressWebChat.toggle()}>Chat with us!</button>
    </div> */}
      </section>

      {/* Footer Section */}
      <Footer />
      
    </div>
  );
};

export default Homepage;