// import react components
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

// import custom components
import RegistrationForm from "../Components/RegistrationForm";

// import css
import "./Registration.css";

class Registration extends Component {
    state = {
        fields: {}
    };
    //onChange stuff goes here:
    onChange = update => {
        this.setState({
            fields: {
                ...this.state.fields,
                ...update
            }
        });
    };

    render() {
        if (localStorage.getItem('token') !== null) {
            return <Redirect to='/dashboard' />
        } else {
            return (
                <div className="Registration">
                    <div className="Registration-header">
                        <h1>Registration</h1>
                        <h2>Welcome new user!</h2>
                    </div>
                    <RegistrationForm onChange={fields => this.onChange(fields)} />
                </div>
            );
        }
    }
}

export default Registration;