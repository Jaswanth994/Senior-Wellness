import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const HelloWorld = () => {
    const query = useQuery();
    const email = query.get('email');
    //const name = query.get('name');
    const navigate = useNavigate();
    const handleSubmit = () => {
        // Navigate to /helloworld with email and password as query params
        navigate(`/Profile`);
    };
    return (
        <div>
            <h1>Hello World!</h1>
            <button type="submit" className="k"  onClick={handleSubmit}>profile</button>
           
            {email && <p>Welcome, {email}</p>}
        </div>
    );
};

export default HelloWorld;
