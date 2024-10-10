import React, { useEffect, useState } from 'react';
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
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Homepage;
