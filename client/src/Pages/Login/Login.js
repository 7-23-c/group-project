// import react components
import React from "react";
import { Redirect } from 'react-router-dom';

// import custom components
import LoginForm from "../../Components/LoginForm/LoginForm";

// import css
import "./Login.css";

class Login extends React.Component {
    render() {
        if (localStorage.getItem('token') !== null) {
            return <Redirect to='/map' />
        } else {
            return (
                <div className="Login">
                    <div className="Login-header">
                        <h2>Welcome Back!</h2>
                    </div>
                    <LoginForm />
                </div>
            );
        }
    }
}

export default Login;