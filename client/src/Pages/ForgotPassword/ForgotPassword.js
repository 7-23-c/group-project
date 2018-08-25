import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import ForgotForm from '../../Components/ForgotForm/ForgotForm';

import './ForgotPassword.css';

class ForgotPassword extends React.Component {
    render() {
        if (localStorage.getItem('token') !== null) {
            return <Redirect to='/map' />
        } else {
            return (
                <div className="ForgotPassword">
                    <div className="ForgotPassword-header">
                        <Link to="/" className="Logo"><h1>Beacons</h1></Link>
                        <h2>Reset Password</h2>
                        <ForgotForm />
                    </div>
                </div>
            );
        }
    }
}

export default ForgotPassword;