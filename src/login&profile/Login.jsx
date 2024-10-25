// src/login&profile/Login.jsx
import React, { useState, useEffect, useCallback } from 'react';
import annyang from 'annyang';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig';
import Header from '../Header1';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [output, setOutput] = useState('Say "email", "password", "name", "submit", or "login".');
  const [isSignUp, setIsSignUp] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

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
      await set(ref(database, 'users/' + user.uid), {
        email: user.email,
        name: name
      });

      setOutput('User signed up successfully!');
      // Redirect to AfterLogin page
      navigate(`/afterlogin`);
    } catch (error) {
      setOutput(`Error signing up: ${error.message}`);
    }
  }, [email, password, name, auth, navigate]);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setOutput('Email and password cannot be empty.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setOutput('Login successful!');
      // Redirect to AfterLogin page
      navigate(`/afterlogin`);
    } catch (error) {
      setOutput(`Login failed: ${error.message}`);
    }
  }, [email, password, auth, navigate]);

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
          setEmail(emailValue.trim());
          setOutput(`Email set to: ${emailValue}`);
        },
        'password *passwordValue': (passwordValue) => {
          setPassword(passwordValue.trim());
          setOutput('Password set');
        },
        'name *nameValue': (nameValue) => {
          setName(nameValue.trim());
          setOutput(`Name set to: ${nameValue}`);
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
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
          <p>{output}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="input-container">
              <i className="fa fa-envelope icon"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-container">
              <i className="fa fa-lock icon"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {isSignUp && (
              <div className="input-container">
                <i className="fa fa-user icon"></i>
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
    </>
  );
};

export default Login;
