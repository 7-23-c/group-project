// import react components
import React from "react";
import { Redirect } from 'react-router-dom';

// import custom components
import RegistrationForm from "../../Components/RegistrationForm/RegistrationForm";

// import css
import "./Registration.css";

class Registration extends React.Component {
    render() {
        if (localStorage.getItem('token') !== null) {
            return <Redirect to='/dashboard' />
        } else {
            return (
                <div className="Registration">
                    <div className="Registration-header">
                        <h2>Welcome new user!</h2>
                    </div>
                    <RegistrationForm />
                </div>
            );
        }
    }
}

export default Registration;