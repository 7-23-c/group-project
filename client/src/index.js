import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Registration from './Components/Registration';
import Login from "./Components/Login";
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Registration />, document.getElementById('Registration Section'));
ReactDOM.render(<Login />, document.getElementById('Login Section'));
registerServiceWorker();
