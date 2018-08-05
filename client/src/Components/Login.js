import React, { Component } from "react";
import "./Login.css";
import LoginForm from "./LoginForm";

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

export default Login;