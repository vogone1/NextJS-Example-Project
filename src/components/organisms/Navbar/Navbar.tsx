import React from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">My Portfolio</div>
            <ul className="navbar__links">
                <li><a href="/">Home</a></li>
                <li><a href="/cv">CV</a></li>
                <li><a href="/projects">Projects</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
