import React, { useEffect, useState } from 'react';
import animationData from './assets/Animationscam.json';
import animationtuto from './assets/Animationtut.json';
import animationtech from './assets/AnimationTech.json';

import Header from './Header';
import Hero from './Hero'; // Now Hero just displays the image
import Card from './Card';
import Footer from './Footer';

import './App.css'; // Ensure the CSS file is linked

const Homepage = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Popup will disappear after 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="App">
      {/* Header Section */}
      <Header />

      {/* Hero Section with just the image */}
      <Hero /> {/* No props passed since there's no title */}

      {/* Main Cards Section */}
      <section className="section">
        <Card animationData={animationtech} title="Tech Help" />
        <Card animationData={animationData} title="Scam Prevention" />
        <Card animationData={animationtuto} title="Live Tutorials" />
      </section>

      {/* Latest Articles & Vlogs Section */}
      <div className='Headings'>
      <h2> Related Articles and Blogs</h2>
      </div>
      
      <section className="section">
        <Card title="Understanding Tech" />
        <Card title="Common Scams" />
        <Card title="Mastering Online Banking" />
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Homepage;
