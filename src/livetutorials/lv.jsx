// src/livetutorial/TutorialSelector.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './lv.css';
import '../App.css';
import Header from '../Header';



const LV = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedOption) {
            navigate(`/option/${selectedOption}`);  
            setSelectedOption('');  
        }
    };

    return (
        <div className='App' >
           < Header />
            <div className='options'>
            <h1>Select a Tutorial Guide</h1>
            <form onSubmit={handleSubmit}>
                <select value={selectedOption} onChange={handleChange}>
                    <option value="">Select an option</option>
                    <option value="location-guide">WhatsApp Location Sharing Guide</option> 
                    <option value="maps-guide">Location Guide</option>
                    <option value="ring">Setting Ringtone for calls</option>
                </select>
                <button type="submit">Go</button>
            </form>
            </div>
        </div>
    );
};

export default LV;
