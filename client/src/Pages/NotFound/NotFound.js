// import react components
import React from 'react';
import { Link } from 'react-router-dom';

// import css
import './NotFound.css';

const NotFound = (props) => {
    function goBack() {
        window.history.back();
    }
    return (
        <div className={props.isLoggedIn ? 'NotFound LoggedIn' : 'NotFound'}>
            <div>
                <h1>Whoops! Looks like you came across a dead end.</h1>
                <h2>Go <span onClick={goBack}>Back</span> or Go <Link to="/">Home</Link></h2>
            </div>
        </div>
    )
}

export default NotFound;