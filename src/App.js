import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Content from './components/Content';
import Add from './app/Add';

const BasicExample = () => (
  <Router className="height100">
    <div className="my-content height100">
      <div className="detail-content">
        <Route exact path="/" component={Content} />
        <Route exact path="/add" component={Add} />
      </div>
      <footer>
        <NavBar />
      </footer>
    </div>
  </Router>
);

export default BasicExample;
