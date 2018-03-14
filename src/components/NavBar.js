import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const NavBar = () => (
    <nav>
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/topics">Topics</Link>
            </li>
        </ul>
    </nav>
)

export default NavBar;