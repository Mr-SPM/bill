import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Content from './components/Content';
const BasicExample = () => (
  <Router class="height100">
    <div class="my-content height100">
      <div className="detail-content">
        <Route exact path="/" component={Content} />
      </div>
      <footer>
        <NavBar></NavBar>
      </footer>
    </div>

  </Router>
);




export default BasicExample;