import React from 'react';
import './Footer.css'; // Include styles

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 MyWebsite. All Rights Reserved.</p>
            <ul className="social-links">
                <li><a href="https://facebook.com">Facebook</a></li>
                <li><a href="https://twitter.com">Twitter</a></li>
                <li><a href="https://linkedin.com">LinkedIn</a></li>
            </ul>
        </footer>
    );
};

export default Footer;
