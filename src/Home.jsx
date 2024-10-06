// import React from 'react';
// import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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

function App() {
  const speed=0.5;
  const navigate = useNavigate()
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false); // Control speaking
  const utteranceRef = useRef(new SpeechSynthesisUtterance());
  const speakingRef = useRef(false);

  useEffect(() => {
    // Function to handle speaking text on hover
    const handleMouseOver = (e) => {
      if (!isSpeakingEnabled) return; // Only speak if enabled

      // Get the exact position where the mouse is
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

    // Attach mouseover event listener to the entire document
    document.addEventListener('mousemove', handleMouseOver);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseOver);
    };
  }, [isSpeakingEnabled]); // Depend on isSpeakingEnabled to update when the toggle changes

  // Function to extract the word under the mouse cursor
  const extractWord = (text, offset) => {
    // Split the text content by spaces and punctuation
    const beforeText = text.slice(0, offset);
    const afterText = text.slice(offset);

    // Match a word at the position using a regex to find the surrounding word
    const wordStart = beforeText.match(/\S+$/); // Match non-space characters before the offset
    const wordEnd = afterText.match(/^\S+/); // Match non-space characters after the offset

    const word = (wordStart ? wordStart[0] : '') + (wordEnd ? wordEnd[0] : '');
    return word.trim(); // Trim any whitespace from the word
  };

  // Function to speak the text
  const speakText = (text) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Cancel any ongoing speech
    }

    utteranceRef.current.text = text;
    utteranceRef.current.rate = speed;

    utteranceRef.current.onend = () => {
      speakingRef.current = false; // Reset speaking state after speaking is done
    };

    speechSynthesis.speak(utteranceRef.current);
  };

  // Function to handle speed changes
  // const handleSpeedChange = (e) => {
  //   setSpeed(e.target.value);
  // };

  // Function to handle the enable/disable toggle
  const handleSpeakingToggle = () => {
    setIsSpeakingEnabled(!isSpeakingEnabled);
  };
  const handlenav=()=>{
    navigate('/Profile')
  }

  return (
    <div style={{ width: '90%', margin: '1rem auto' }}>
      <h1>Hover over any element to hear its text</h1>
      <p>This is a paragraph. Hover over me to hear what I say, but only the word you're hovering over.</p>
      {/* Enable/Disable Speak Toggle */}
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="speak-toggle" style={{ marginRight: '10px' }}>
          Enable Speak on Hover
        </label>
        <input
          type="checkbox"
          id="speak-toggle"
          checked={isSpeakingEnabled}
          onChange={handleSpeakingToggle}
        />
        <button onClick={handlenav}>Profile</button>
      </div>
      
    </div>
  );
}

export default App;

