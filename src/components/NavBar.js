import React from 'react';
import { Link } from "react-router-dom";
const NavBar = () => (
    <nav>
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <Link className="nav-link" to="/chart">Static</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/add"><i className="iconfont">&#xe64e;</i></Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/topics">?</Link>
            </li>
        </ul>
    </nav>
)

export default NavBar;