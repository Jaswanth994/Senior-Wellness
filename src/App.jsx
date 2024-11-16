import 'regenerator-runtime/runtime';
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Homepage from './homepagefolder/HomePage';
import Login from './login&profile/Login.jsx';
import Profile from './login&profile/Profile';
import HelloWorld from './login&profile/Home';
import WelcomePopup from './Popup';
import './App.css';
import Home from './components/Home.jsx';
import Quiz from './components/Quiz.jsx';
import Results from './components/Results.jsx';
import ArticlesPage from './components/ArticlesPage.jsx';
import Livetutorial from './livetutorials/lv.jsx';
import LocationSharingGuide from './livetutorials/livetutorials/lv1/lv1.jsx';
import MapsGuide from './livetutorials/livetutorials/lv2/lv2.jsx';
import Ringtone from './livetutorials/livetutorials/lv3/lv3.jsx';
import Language from './livetutorials/livetutorials/lv4/lv4.jsx';
import ScamPreventionHome from './scam/ScamPreventionHome.jsx';
import LinkChatbot from './scam/msg/LinkChatbot.jsx';
import Call from './scam/call/call.jsx';
import Linkhome from './scam/link/components/HomePage.jsx';
import PageOne from './scam/link/components/PageOne';
import PageTwo from './scam/link/components/PageTwo';
import PageThree from './scam/link/components/PageThree';
import LandingPageOne from './scam/link/components/LandingPageOne';
import LandingPageTwo from './scam/link/components/LandingPageTwo';
import LandingPageThree from './scam/link/components/LandingPageThree';

function App() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  

  // Handle the button click to enable voice navigation.
  const startListening = () => {
    setIsListening(true);

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log('Heard command:', command);

      if (command.includes('home')) navigate('/');
      else if (command.includes('login')) navigate('/login');
      else if (command.includes('profile')) navigate('/profile');
      else if (command.includes('quiz')) navigate('/quizhome');
      else if (command.includes('results')) navigate('/results');
      else if (command.includes('article')) navigate('/article-page');
      else if (command.includes('live tutorial')) navigate('/livetutorial');
      else if (command.includes('location guide')) navigate('/option/location-guide');
      else if (command.includes('maps guide')) navigate('/option/maps-guide');
      else if (command.includes('ringtone')) navigate('/option/ring');
      else if (command.includes('language')) navigate('/option/language');
      else if (command.includes('scam home')) navigate('/scamhome');
      else if (command.includes('call')) navigate('/call');
      else console.log('Unrecognized command');
    };

    recognition.start();

    // Stop listening after 3.5 seconds
    setTimeout(() => {
      recognition.stop();
      setIsListening(false);
    }, 3500);
  };

  return (
    <div className="App">
      <WelcomePopup />
      <button className='speakbutton' onClick={startListening} disabled={isListening}>
        {isListening ? "Listening..." :"Voice"}
      </button>
      
      <div className="info-button-container">
  <button className="infobutton">i</button>
  <div className="info-tooltip">
    <strong>Available Voice Commands:</strong>
    <ul>
      <li><strong>"Home"</strong> - Navigate to the Homepage</li>
      <li><strong>"Login"</strong> - Go to the Login Page</li>
      <li><strong>"Profile"</strong> - Open the Profile Page</li>
      <li><strong>"Quiz"</strong> -  Opens Quiz Homepage</li>
      <li><strong>"Results"</strong> - View Quiz Results</li>
      <li><strong>"Article"</strong> - Read the Article Page</li>
      <li><strong>"Live Tutorial"</strong> - Access Live Tutorials</li>
      <li><strong>"Location Guide"</strong> - Location Sharing Guide</li>
      <li><strong>"Maps Guide"</strong> - Maps Tutorial</li>
      <li><strong>"Ringtone"</strong> - Set up Ringtone Tutorial</li>
      <li><strong>"Language"</strong>- Set up Language Tutorial</li>
      <li><strong>"Call"</strong>-Goes to Call scam</li>
    </ul>
  </div>
</div>


      <Routes>
        <Route path="/" element={<Homepage />} />

        {/* Other routes for login, profile, hello world */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/helloworld" element={<HelloWorld />} />
        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        {/* <Route path="/type1-articles" element={<ArticlesPage />} /> */}
        {/* <Route path="/type2-articles" element={<ArticlesPage />} /> */}
        <Route path="/quizhome" element={<Home />} />
        <Route path="/article-page" element={<ArticlesPage />} />
        {/* <Route path="/article-page" element={<ArticlePage />} /> */}
        <Route path="/livetutorial" element={<Livetutorial />} />
        <Route path="/option/location-guide" element={<LocationSharingGuide />} />
        <Route path="/option/maps-guide" element={<MapsGuide />} />
        <Route path="/option/ring" element={<Ringtone />} />
        <Route path="/option/language" element={<Language />} />
        <Route path = "/call" element={<Call />} />
        <Route path = "/scamhome" element={<ScamPreventionHome />} />
        <Route path = "/link-chatbot" element={<LinkChatbot />} />
        <Route path = "/linkhome" element = {<Linkhome />} />
        <Route path="/page1" element={<PageOne />} />
        <Route path="/page2" element={<PageTwo />} />
        <Route path="/page3" element={<PageThree />} />
        <Route path="/landing1" element={<LandingPageOne />} />
        <Route path="/landing2" element={<LandingPageTwo />} />
        <Route path="/landing3" element={<LandingPageThree />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      

    </div>
  );
}

export default App;
