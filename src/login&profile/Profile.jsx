import React, { useState, useEffect, useRef } from 'react';
import './Profile.css';
import { database } from './firebaseConfig';
import { ref, orderByChild, equalTo, query, get, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [quizResults, setQuizResults] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);
    
    const speakingRef = useRef(false);
    const utteranceRef = useRef(new SpeechSynthesisUtterance());
    const speed = 1;  // Adjust the speed as per your requirement

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


    const fetchQuizResults = async (uid) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/quiz-results/user/${uid}`);
            setQuizResults(response.data);
        } catch (error) {
            console.error('Error fetching quiz results:', error);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userEmail = user.email;
            const userRef = query(ref(database, 'users'), orderByChild('email'), equalTo(userEmail));

            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    // console.log("User data:", userData);
                    const uid = Object.keys(userData)[0];
                    const userDetails = userData[uid];

                    setEmail(userDetails.email);
                    setName(userDetails.name);
                    setPassword(userDetails.password);
                    
                    // Fetch quiz results for the user
                    fetchQuizResults(uid);
                } else {
                    console.error('No user data found.');
                }
                setLoading(false);
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                setLoading(false);
            });
        } else {
            console.error('User is not authenticated');
            setLoading(false);
        }
    }, []);

    

    const handleSave = () => {
        if (email) {
            const userRef = query(ref(database, 'users'), orderByChild('email'), equalTo(email));
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const uid = Object.keys(snapshot.val())[0];

                    update(ref(database, `users/${uid}`), {
                        email,
                        name,
                        password
                    }).then(() => {
                        setIsEditing(false);
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
        <div className="profile-container">
            <div className="profile-header">
                <h1>Hello, {name}</h1>
                <p>Welcome to your profile page! Manage your details and view your progress.</p>
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
            <div className="profile-content">
                <div className="profile-info">
                    <h2>My Account</h2>
                    {!isEditing ? (
                        <>
                            <div className="profile-field">
                                <label>Email:</label>
                                <span>{email}</span>
                            </div>
                            <div className="profile-field">
                                <label>Name:</label>
                                <span>{name}</span>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}>
                            <div className="profile-field">
                                <label>Email:</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="profile-field">
                                <label>Name:</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="profile-field">
                                <label>Password:</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    )}
                </div>
                <div className="profile-progress">
                    <h2>Progress</h2>
                    <div className="quiz-results">
                        {quizResults.length > 0 ? (
                            quizResults.map((result) => (
                                <div key={result._id} className="quiz-result">
                                    <p>Category: {result.category}</p>
                                    <p>Score: {result.score}</p>
                                    <p>Date: {new Date(result.date).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No quiz results found.</p>
                        )}
                    </div>
                </div>
            </div>
            <button onClick={handleSpeakingToggle} style={{ marginBottom: '10px' }}>
                {isSpeakingEnabled ? 'Disable Speaking' : 'Enable Speaking'}
            </button>
        </div>
    );
};

export default Profile;
