import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './scss/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

const getClientHeight = () => {
    document.body.style.height = window.innerHeight + 'px';
}
getClientHeight();