    // src/livetutorial/TutorialSelector.jsx
    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import './lv.css';
    import '../App.css';
    import Header from '../Header';

    const LV = () => {
        const navigate = useNavigate();

        // Function to handle box selection
        const handleOptionClick = (option) => {
            navigate(`/option/${option}`);
        };

        return (
            <div className='App'>
            <Header />
                <div className='options1'>
                    <h1>Select a Tutorial Guide</h1>
                    <div className="option-boxes1">
                        <div className="option-box1" onClick={() => handleOptionClick('location-guide')}>
                            WhatsApp Location Sharing Guide
                        </div>
                        <div className="option-box1" onClick={() => handleOptionClick('maps-guide')}>
                            Location Guide
                        </div>
                        <div className="option-box1" onClick={() => handleOptionClick('ring')}>
                            Setting Ringtone for calls
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default LV;
