import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => (
  <nav>
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          <i className="iconfont icon-content" />
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/add">
          <i className="iconfont icon-add" />
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/chart">
          <i className="iconfont icon-chart" />
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
