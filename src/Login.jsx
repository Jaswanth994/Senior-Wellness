import React, { useState, useEffect, useCallback } from 'react';
import annyang from 'annyang';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig';
import './Login.css'
import 'font-awesome/css/font-awesome.min.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [output, setOutput] = useState('Say 1.Email, 2.password, 3.name, 4. Signup or Login.');
    const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and login
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
                    setOutput('Microphone access granted. Say 1.Email, 2.password, 3.name \n After filling Say Create for Signup or Submit for Login');
                }
            } catch (err) {
                setPermissionGranted(false);
                setOutput('Microphone access denied. Please allow microphone access in your browser settings.');
            }
        };
        requestMicrophonePermission();
    }, []);

    const handleSignUp = useCallback(async () => {
        if(!email||!password||!name){
            setOutput('please enter correct email ,password and name');
            return;
        }
        else if (!email.includes('@') || password.length < 6 || !name) {
            setOutput('Please enter a valid email, password with at least 6 characters, and name.');
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
            navigate(`/helloworld?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
        } catch (error) {
            setOutput(`Error signing up: ${error.message}`);
        }
    }, [email, password, name, auth, navigate]);

    const handleLogin = useCallback(async () => {
        console.log("came")
        if (!email || !password) {
            setOutput('Email and password cannot be empty.');
            return;
        }
        try {
            console.log("came")
            await signInWithEmailAndPassword(auth, email, password);
            setOutput('Login successful!');
            navigate(`/HelloWorld?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`);
        } catch (error) {
            setOutput(`Login failed: ${error.message}`);
        }
    }, [email, password, auth, navigate, name]);

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
                'e-mail *emailValue': (emailValue) => {
                    let cleanedEmail = emailValue.trim();

                   // Remove trailing period if present
                   ///if (cleanedEmail.endsWith('.')) {
                       cleanedEmail = cleanedEmail.slice(0, -1);
                   

                  setEmail(cleanedEmail);
                  setOutput(`Email set to: ${cleanedEmail}`);
                },
                'mail *emailValue': (emailValue) => {
                    let cleanedEmail = emailValue.trim();

                    // Remove trailing period if present
                    //if (cleanedEmail.endsWith('.')) {
                        cleanedEmail = cleanedEmail.slice(0, -1);
                    
                
                    setEmail(cleanedEmail);
                    setOutput(`Email set to: ${cleanedEmail}`);
                },
                'E-mail *emailValue': (emailValue) => {
                    let cleanedEmail = emailValue.trim();

                    // Remove trailing period if present
                    //if (cleanedEmail.endsWith('.')) {
                        cleanedEmail = cleanedEmail.slice(0, -1);
                   
                
                    setEmail(cleanedEmail);
                    setOutput(`Email set to: ${cleanedEmail}`);
                },
                'Email *emailValue': (emailValue) => {
                    let cleanedEmail = emailValue.trim();
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
                    setOutput(`Name set to: ${nameValue}`);
                },
                'sign up.': () => {
                    console.log("Voice command 'toggle sign up' detected");
                    setIsSignUp(true);
                    setOutput('Switched to sign-up mode After filling Say Create.');
                },
                'Sign up.': () => {
                    console.log("Voice command 'toggle sign up' detected");
                    setIsSignUp(true);
                    setOutput('Switched to sign-up mode After filling Say Create.');
                },
                'Sign up': () => {
                    
                    console.log("Voice command 'toggle sign up' detected");
                    setIsSignUp(true);
                    setOutput('Switched to sign-up mode After filling Say Create.');
                },

                'sign up': () => {
                    console.log("Voice command 'toggle sign up' detected");
                    setIsSignUp(true);
                    setOutput('Switched to sign-up mode After filling Say Create.');
                },
                'Submit': () => {
                    console.log("Voice command 'login' detected");
                    if (!isSignUp) {
                        handleLogin();
                    } else {
                        setOutput('Please switch to login mode first.');
                    }
                },
                'Submit.': () => {
                    console.log("Voice command 'login' detected");
                    try{
                        handleLogin();
                    } catch {
                        setOutput('Please switch to login mode first.');
                    }
                },
                'create': () => {
                    console.log("Voice command 'submit' detected");
                    handleSubmit();
                },
                'Create': () => {
                    console.log("Voice command 'submit' detected");
                    handleSubmit();
                    
                },
                'Create.': () => {
                    console.log("Voice command 'submit' detected");
                    handleSubmit();
                },
                'Login.': () => {
                    setIsSignUp(false);
                    console.log("Voice command 'toggle login' detected");
                    setOutput('Switched to login mode. After filling Say submit');
               },
               'Login': () => {
                setIsSignUp(false);
                console.log("Voice command 'toggle login' detected");
                setOutput('Switched to login mode.  After filling Say submit');
           },
               'login.': () => {
                    console.log("Voice command 'toggle login' detected");
                    setIsSignUp(false);
                    setOutput('Switched to login mode. After filling Say submit');
                }
            };
    
            annyang.addCommands(commands);
            annyang.debug(true);  // Enable detailed logs
            annyang.addCallback('result', (phrases) => {
                console.log("Recognized phrases: ", phrases); // Show recognized phrases in console
                setOutput(`You said: ${phrases[0]}`); // Display the first recognized phrase
            });
            annyang.start({ autoRestart: true, continuous: true });
    
            return () => {
                annyang.abort();
            };
        } else if (!annyang) {
            setOutput('Voice recognition not supported on this browser.');
        }
    }, [handleSubmit, permissionGranted, handleLogin, isSignUp]);
    

    return (
        <div >
           <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Senior wellness</a>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
     
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Have a nice day" aria-label="Search"/>
        
      </form>
    </div>
  </div>
</nav>

            <div className="login-box">
                <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                <p>{output}</p>
                
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className="input-with-icon">
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
            style={{ cursor: 'pointer' }}
        />
    </div>
</div>

                    {isSignUp && (
                        <div className="input-with-icon">
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
                        <p>Already have an account? Say Login <button onClick={() => setIsSignUp(false)}>Login</button></p>
                    ) : (
                        <p>Don't have an account? Say Signup <button onClick={() => setIsSignUp(true)}>Sign Up</button></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;