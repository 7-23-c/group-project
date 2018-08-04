import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
document.getElementById('Registration Section'));
registerServiceWorker();
