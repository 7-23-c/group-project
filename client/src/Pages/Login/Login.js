// import react components
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

// import custom components
import LoginForm from "../../Components/LoginForm/LoginForm";

// import css
import "./Login.css";

class Login extends Component {
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
            return <Redirect to='/map' />
        } else {
            return (
                <div className="Login">
                    <div className="Login-header">
                        <h1>Login</h1>
                        <h2>Welcome Back!</h2>
                    </div>
                    <LoginForm onChange={fields => this.onChange(fields)} />
                </div>
            );
        }
    }
}

export default Login;