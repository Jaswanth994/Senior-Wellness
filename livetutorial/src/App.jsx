import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LocationSharingGuide from './livetutorials/lv1/lv1'; // Import the guide
import MapsGuide from './livetutorials/lv2/lv2';
import './App.css';

const App = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedOption) {
            navigate(`/option/${selectedOption}`);  // Programmatic navigation
            setSelectedOption('');  // Reset selected option after navigation
        }
    };

    return (
        <div className="container">
            <h1>Select an Option</h1>
            <form onSubmit={handleSubmit}>
                <select value={selectedOption} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="location-guide">WhatsApp Location Sharing Guide</option> 
                    <option value="maps-guide">Location Guide</option>
                    <option value="option3">Other Option 3</option>
                </select>
                <button type="submit">Go</button>
            </form>
        </div>
    );
};

const Main = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/option/location-guide" element={<LocationSharingGuide />} />
            <Route path="/option/maps-guide" element={<MapsGuide />} />
            {/* Define other routes here if necessary */}
        </Routes>
    </Router>
);

export default Main;
