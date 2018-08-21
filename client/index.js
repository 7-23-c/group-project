// import react components
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import components
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';

// import custom components
import App from './Main/App/App';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <CssBaseline />
            <App />
        </div>
    </BrowserRouter>,
document.getElementById('app'));
registerServiceWorker();
