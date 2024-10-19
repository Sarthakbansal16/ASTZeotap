// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create-rule">Create Rule</Link></li>
                <li><Link to="/combine-rules">Combine Rules</Link></li>
                <li><Link to="/evaluate-rule">Evaluate Rule</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
