import React from 'react';
import './Header.css'; // Include styles

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="logo">MyWebsite</div>
                <ul className="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
