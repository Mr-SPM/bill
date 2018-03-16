import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRoute from './route';
import NavBar from './components/NavBar';
const App = () => (

  <Router className="height100">
    <div className="flex-column height100">
      <div className="flex-content">
        <MyRoute />
        {/* <Route exact path="/" component={Content} />
        <Route exact path="/add" component={Add} /> */}
      </div>
      <footer>
        <NavBar />
      </footer>
    </div>
  </Router>
);

export default App;
