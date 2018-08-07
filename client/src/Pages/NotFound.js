import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    function goBack() {
        window.history.back();
    }
    return (
        <div className="NotFound">
            <div>
                <h1>Whoops! Looks like you came across a dead end.</h1>
                <h2>Go <span onClick={goBack}>Back</span> or Go <Link to="/">Home</Link></h2>
            </div>
        </div>
    )
}

export default NotFound;