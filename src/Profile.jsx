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
