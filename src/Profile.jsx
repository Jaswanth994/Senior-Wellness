import React, { useState, useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import { database } from './firebaseConfig'; // Import the initialized Firebase database from new.js
import { ref, orderByChild, equalTo, query, get, update } from 'firebase/database'; // Import necessary Firebase functions
import { getAuth } from 'firebase/auth'; // Import getAuth from Firebase Auth


const Profile = () => {


    //const queryParams = useQuery();
    //const emailQuery = queryParams.get('email'); // Optional, you can remove this if you don't use it
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const speed = 0.5;
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
  
    // Fetch user data from Firebase when the component mounts
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userEmail = user.email; // Get the email of the authenticated user
            const userRef = query(ref(database, 'users'), orderByChild('email'), equalTo(userEmail));

            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const userId = Object.keys(userData)[0]; // Get the first user ID
                    const userDetails = userData[userId];

                    // Set the state with fetched data
                    setEmail(userDetails.email);
                    setName(userDetails.name);
                    setPassword(userDetails.password); // Ensure `password` is being saved in Firebase
                } else {
                    console.error('No user data found.');
                }
                setLoading(false); // Data fetching is complete
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
        } else {
            console.error('User is not authenticated');
            setLoading(false); // Stop loading if no user is authenticated
        }
    }, []);
    
    
    const handleSave = () => {
        if (email) { 
            const userRef = query(ref(database, 'users'), orderByChild('email'), equalTo(email));
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userId = Object.keys(snapshot.val())[0]; // Get user ID

                   
                    update(ref(database, `users/${userId}`), {
                        email,
                        name,
                        password
                    }).then(() => {
                        setIsEditing(false); // Stop editing mode
                        alert('Profile updated successfully!');
                    }).catch((error) => {
                        console.error('Error updating profile:', error);
                    });
                }
            }).catch((error) => {
                console.error('Error fetching user data for update:', error);
            });
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Profile</h1>
            {!isEditing ? (
                <div>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Name:</strong> {name}</p>
                    
                    <button 
                        style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}>
                        <div>
                            <label>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div>
                            <label>Name:</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div>
                     <label>Password :</label>
                   <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer' }}
                        >
                            Save Changes
                        </button>
                        <button 
                            style={{ padding: '10px', backgroundColor: 'grey', color: 'white', cursor: 'pointer', marginLeft: '10px' }}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
           
        </div>
    );
};

export default Profile;
