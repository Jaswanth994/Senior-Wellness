// Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faCog, faMoon, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Navigation from './homepagefolder/Navigation';
import animationData from './assets/animHeart.json';
import './Header.css';


const Header = () => {
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();

    const removeTranslateBanner = () => {
        const translateBanner = document.querySelector('.goog-te-banner-frame');
        if (translateBanner) {
            translateBanner.style.display = 'none';
            document.body.style.top = '0px';
        }
    };
    
    useEffect(() => {
        const addScript = () => {
          const script = document.createElement('script');
          script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
          script.async = true;
          document.body.appendChild(script);
        };
    
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en' ,includedLanguages:"hi,te,ta,kn,ml,gu,bn,mr,pa,en", layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
            'google_translate_element'
          );
        };
    
      
    
        addScript();
    },[]);

    const interval = setInterval(removeTranslateBanner, 500);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (!event.target.closest(".profile-section")) {
            setDropdownVisible(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, [auth]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            setUser(null);
            navigate('/login');
        });
    };

    const toggleDropdown = () => {
        setDropdownVisible((prevState) => !prevState);
        if (!dropdownVisible) {
            initializeGoogleTranslate();
        }
    };


    return (
        <header className="header">
            <div className="header-title-container">
                <h1 className="header-title">Senior Wellness</h1>
                <div className="lottie-container">
                    <Lottie animationData={animationData} style={{ width: 40, height: 40 }} />
                </div>
            </div>
            <div id="google_translate_element" className="translate-widget"></div>
            {/* <Navigation /> */}
            <nav className="auth-navigation">
                {user ? (
                    <div className="profile-section">
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            size="2x"
                            onClick={toggleDropdown}
                            className="profile-icon"
                        />
                        {dropdownVisible && (
                            <div className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}>
                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                <Link to="/about-us" className="dropdown-item">
                                    <FontAwesomeIcon icon={faInfoCircle} /> About Us
                                </Link>
                                <Link to="/settings" className="dropdown-item" onClick={() => alert("Settings option feature coming soon!")}>
                                    <FontAwesomeIcon icon={faCog} /> Settings
                                </Link>
                                <div className="dropdown-item" onClick={() => alert("Change mode feature coming soon!")}>
                                    <FontAwesomeIcon icon={faMoon} /> Change Mode
                                </div>
                                {/* <div id="google_translate_element" className="dropdown-item translate-option"></div> */}
                                <div className="dropdown-item" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </div>
                            </div>
)}
                    </div>
                ) : (
                    <div className="header-login-section">
                        <Link to="/login">Login</Link>
                        <div id="google_translate_element" className="translate-option"></div>
                    </div>
                )}
            </nav>  
        </header>
    );
};

export default Header;
