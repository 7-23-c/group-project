import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <BrowserRouter>
        <div>
            <CssBaseline />
            <App />
        </div>
    </BrowserRouter>,
document.getElementById('root'));
registerServiceWorker();
