// Header.jsx
import React, { useEffect, useState,useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faCog, faMoon, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Navigation from './homepagefolder/Navigation';
import animationData from './assets/animHeart.json';
import './Header.css';
import './homepagefolder/Navigation.css';


const Header = () => {
        
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [user, setUser] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false); 
    const removeTranslateBanner = () => {
        const translateBanner = document.querySelector('.goog-te-banner-frame');
        if (translateBanner) {
            translateBanner.style.display = 'none';
            document.body.style.top = '0px';
        }
    };
    
    // Add scroll listener to handle header style
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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


    const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);

    const speakingRef = useRef(false);
    const utteranceRef = useRef(new SpeechSynthesisUtterance());
    const speed = 1;
  
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

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            
            <div className="header-title-container">
                <div className="header-title">Senior Wellness</div>
                <div className="lottie-container">
                    <Lottie animationData={animationData} style={{ width: 40, height: 40 }} />
                </div>
                
                <div className="translate-speaking-box">
                    <div id="google_translate_element" className="translate-widget"></div>
                    <button
                        onClick={handleSpeakingToggle}
                        className={`speaking-button ${isSpeakingEnabled ? 'enabled' : ''}`}
                    >
                        {isSpeakingEnabled ? 'Disable Speaking' : 'Enable Speaking'}
                    </button>
                </div>
            </div>
            <div className="header-title-container">
            <Link to="/" className={`home-link ${isHome ? 'active' : ''}`}>
                Home
            </Link>
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
                                <div className="dropdown-item" onClick={() => alert("Settings option feature coming soon!")}>
                                    <FontAwesomeIcon icon={faCog} /> Settings
                                </div>
                                <div className="dropdown-item" onClick={() => alert("Change mode feature coming soon!")}>
                                    <FontAwesomeIcon icon={faMoon} /> Change Mode
                                </div>
                                <div className="dropdown-item" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="header-login-section">
                        <Link to="/login">Login</Link>
                    </div>
                )}
            </nav>
            </div>
        </header>
    );
    
};


export default Header;



