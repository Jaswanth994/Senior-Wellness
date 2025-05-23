// src/login&profile/Login.jsx
import React, { useState, useEffect, useCallback } from 'react';
import annyang from 'annyang';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig';
import axios from 'axios';
import Header from '../Header1';
import './Login.css';
import loginImage from '../assets/loginimage.png';
import 'font-awesome/css/font-awesome.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [output, setOutput] = useState('Say "email", "password", "name", "submit", or "login".');
    const navigate = useNavigate();
    const [permissionGranted, setPermissionGranted] = useState(false);
    const location = useLocation();
    const auth = getAuth();

    // Set persistence on initial load
    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .catch((error) => {
                console.error("Error setting persistence:", error);
            });
    }, [auth]);

    // Check if the user is already logged in and redirect if so
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });
        return unsubscribe;
    }, [auth, navigate, location.state]);

    const storeUserInMongoDB = async (user) => {
        try {
            await axios.post('https://senior-wellness-1.onrender.com/api/users/create-user', {
                uid: user.uid,
                email: user.email,
                name: name,
            });
            setOutput('User data stored in MongoDB successfully!');
        } catch (error) {
            setOutput(`Error storing user data in MongoDB: ${error.message}`);
        }
    };

     // Request microphone permission on mount
     useEffect(() => {
        const requestMicrophonePermission = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                if (stream) {
                    setPermissionGranted(true);
                    setOutput('Microphone access granted. Say "email", "password", "name", "submit", or "login".');
                }
            } catch (err) {
                setPermissionGranted(false);
                setOutput('Microphone access denied. Please allow microphone access in your browser settings.');
            }
        };
        requestMicrophonePermission();
    }, []);


    const handleSignUp = useCallback(async () => {
        if (!email || !password || !name) {
            setOutput('Please enter all email, password, and name.');
            return;
        } else if (!email.includes('@') || password.length < 6) {
            setOutput('Please enter a valid email and a password with at least 6 characters.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await Promise.all([
                storeUserInMongoDB(user),  // Store in MongoDB
                set(ref(database, 'users/' + user.uid), {  // Store in Firebase
                    email: user.email,
                    name: name
                })
            ]);
            setOutput('User signed up successfully!');
            const redirectPath = location.state?.from || '/';
            navigate(redirectPath);
        } catch (error) {
            setOutput(`Error signing up: ${error.message}`);
        }
    }, [email, password, name, auth, navigate, location.state]);

    const handleLogin = useCallback(async () => {
        if (!email || !password) {
            setOutput('Email and password cannot be empty.');
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setOutput('Login successful!');
            const user = userCredential.user;
            // await storeUserInMongoDB(user);
            const redirectPath = location.state?.from || '/';
            navigate(redirectPath);
        } catch (error) {
            setOutput(`Login failed: ${error.message}`);
        }
    }, [email, password, auth, navigate, location.state]);

  const handleSubmit = useCallback(() => {
    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  }, [isSignUp, handleSignUp, handleLogin]);

    useEffect(() => {
        if (annyang && permissionGranted) {
            const commands = {
                'email *emailValue': (emailValue) => {
                    let cleanedEmail = emailValue.trim();

                    // Remove trailing period if present
                    //if (cleanedEmail.endsWith('.')) {
                        cleanedEmail = cleanedEmail.slice(0, -1);
                    
                
                    setEmail(cleanedEmail);
                    setOutput(`Email set to: ${cleanedEmail}`); 
                },
                'password *passwordValue': (passwordValue) => {
                    setPassword(passwordValue.trim());
                    setOutput('Password set');
                },
                'name *nameValue': (nameValue) => {
                    setName(nameValue.trim());
                    // setOutput(Name set to: ${nameValue});
                },
                'sign up': () => {
                    handleSubmit();
                },
                'login': () => {
                    setIsSignUp(false);
                    setOutput('Switched to login mode.');
                },
            };

      annyang.addCommands(commands);
      annyang.start({ autoRestart: true, continuous: true });

      return () => {
        annyang.abort();
      };
    } else if (!annyang) {
      setOutput('Voice recognition not supported on this browser.');
    }
  }, [handleSubmit, permissionGranted]);

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                <p>{output}</p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        isSignUp ? handleSignUp() : handleLogin();
                    }}
                >
                    <div className="input-container">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                <div className="input-container">
                <div className="input-with-icon">
        <i className="fa fa-lock icon"></i>
        <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
        />
        <i
            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
            onClick={() => setShowPassword(!showPassword)}
        />
    </div>
                    </div>
                    {isSignUp && (
                        <div className="input-container">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your Name"
                                required
                            />
                        </div>
                    )}
                    <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
                </form>
                <div className="toggle-mode">
                    {isSignUp ? (
                        <p>Already have an account? <button onClick={() => setIsSignUp(false)}>Login</button></p>
                    ) : (
                        <p>Don't have an account? <button onClick={() => setIsSignUp(true)}>Sign Up</button></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
