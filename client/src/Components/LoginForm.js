import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from 'axios';
import './LoginForm.css';
import { Link } from 'react-router-dom';

class LoginForm extends Component {

    // initialize state:
    state = {

        email: "",
        email_error: "",

        password: "",
        password_error: ""
    };

    change = e => {
        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    //Validation stuff goes here:
    // validate = () => {
    //     let isError = false;
    //     const errors = {

    //         username_error: "",
    //         password_error: ""
    //     };
    //     //check the first_name field

    //     //check the username
    //     if (this.state.username.length < 4) {
    //         isError = true;
    //         errors.username_error = "Username was not found";
    //     }

    //     //check the password length
    //     if (this.state.password.length < 5) {
    //         isError = true;
    //         errors.password_error = "Password does not match username";
    //     }

    //     this.setState({
    //         ...this.state,
    //         ...errors
    //     });

    //     return isError;
    // };

    onSubmit = e => {
        e.preventDefault();
        // TODO: submit stuff (send url to the database)
        // this.props.onSubmit(this.state);
        Axios.post('/token', {
            email: this.state.email,
            password: this.state.password
        })
        .then(function(res) {
            if (!res.data.token) {
                throw new Error('Invalid Username or Password');
            } else {
                localStorage.setItem('token', res.data.token);
                window.location = '/dashboard';
            }
        })
        .catch(function(err) {
            console.log(err);
        })
        /*
        const err = this.validate();
        if (!err) {
            // clear form after the onSubmit()
            this.setState({

                username: "",
                username_error: "",

                password: "",
                password_error: ""
            });
            this.props.onChange({
                username: "",
                password: ""
            });
        }*/
    };

    render() {
        return (
            <form  className="LoginForm">
                <TextField
                    name="email"
                    label="Email"
                    value={this.state.username}
                    onChange={e => this.change(e)}
                />
                <TextField
                    name="password"
                    label="Password"
                    value={this.state.password}
                    onChange={e => this.change(e)}
                    type="password"
                />
                <Button type="submit" label="Login" onClick={e => this.onSubmit(e)} variant="contained" size="medium">Login</Button>
                <div>Don't have an account yet? <Link to="/register">Create one!</Link></div>
            </form>
        );
    }
}
export default LoginForm;