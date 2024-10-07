import React from 'react';
import './HeroSection.css'; // Include styles

const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Welcome to MyWebsite</h1>
                <p>Your gateway to professional services and resources.</p>
                <button className="cta-btn">Get Started</button>
            </div>
        </section>
    );
};

export default HeroSection;
