import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import Footer from './components/Footer';
import './HomePage.css'; // Include styles
import image1 from './assets/image1.jpeg';
import image2 from './assets/image2.jpeg';
import image3 from './assets/image3.jpeg';
const HomePage = () => {
    return (
        <div>
            <Header />
            <HeroSection />
            <section className="features">
                <h2>Our Services</h2>
                <div className="feature-list">
                    <FeatureCard 
                        image={image1}
                        title="Tech Help"
                        description="Get expert assistance with all your technical needs."
                    />
                    <FeatureCard 
                        image={image2}
                        title="Scam Prevention"
                        description="Learn how to prevent scams and stay safe online."
                    />
                    <FeatureCard 
                        image={image3}
                        title="Live Tutorials"
                        description="Step-by-step tutorials to help you navigate apps."
                    />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;
