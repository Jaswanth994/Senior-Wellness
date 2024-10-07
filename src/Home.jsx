// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './App.css'

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

// const HelloWorld = () => {
//     const query = useQuery();
//     const email = query.get('email');
//     //const name = query.get('name');
//     const navigate = useNavigate();
//     const handleSubmit = () => {
//         // Navigate to /helloworld with email and password as query params
//         navigate(`/Profile`);
//     };
//     return (
//         <div>
//             <h1>Hello World!</h1>
//             <button type="submit" className="k"  onClick={handleSubmit}>profile</button>
           
//             {email && <p>Welcome, {email}</p>}
//         </div>
//     );
// };

// export default HelloWorld;
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function App() {
  const speed = 0.5;
  const navigate = useNavigate();
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false); // Control speaking
  const utteranceRef = useRef(new SpeechSynthesisUtterance());
  const speakingRef = useRef(false);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (!isSpeakingEnabled) return;

      const mousePos = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (mousePos && mousePos.startContainer.nodeType === Node.TEXT_NODE) {
        const textNode = mousePos.startContainer;
        const offset = mousePos.startOffset;

        const word = extractWord(textNode.textContent, offset);
        if (word && !speakingRef.current) {
          speakingRef.current = true;
          speakText(word);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseOver);
    return () => {
      document.removeEventListener('mousemove', handleMouseOver);
    };
  }, [isSpeakingEnabled]);

  const extractWord = (text, offset) => {
    const beforeText = text.slice(0, offset);
    const afterText = text.slice(offset);

    const wordStart = beforeText.match(/\S+$/); // Match non-space characters before the offset
    const wordEnd = afterText.match(/^\S+/); // Match non-space characters after the offset

    const word = (wordStart ? wordStart[0] : '') + (wordEnd ? wordEnd[0] : '');
    return word.trim(); 
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

  const handleNav = () => {
    navigate('/Profile');
  };

  return (
    <div style={{ width: '90%', margin: '1rem auto' }}>
      <h1>Hover over any element to hear its text</h1>
      <p>This is a paragraph. Hover over me to hear what I say, but only the word you're hovering over.</p>

    

      <button onClick={handleNav} style={{ marginBottom: '50px' }}>Profile</button>
      <div style={{  alignItems: 'center', marginBottom: '10px' }}>
  <input
    type="checkbox"
    id="speak-toggle"
    checked={isSpeakingEnabled}
    onChange={handleSpeakingToggle}
    style={{ marginBottom: '10px', transform: 'scale(3.5)' }} // Increase checkbox size and add margin
  />
  <label htmlFor="speak-toggle" style={{ marginLeft: '0px', lineHeight: '1' }}>Enable Speak on Hover</label>
</div>
    </div>
  );
}

export default App;


