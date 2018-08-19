// import react components
import React, { Component } from "react";
import { Link } from 'react-router-dom';

// import components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from 'axios';

// import css
import './RegistrationForm.css';

class RegistrationForm extends Component {

    // initialize state:
    state = {
        first_name: "",
        first_name_error: "",
        last_name: "",
        last_name_error: "",
        username: "",
        username_error: "",
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
    validate = () => {
        let isError = false;
        const errors = {
            first_name_error: "",
            last_name_error: "",
            username_error: "",
            email_error: "",
            password_error: ""
        };
        //check the first_name field
        if (this.state.first_name.length <= 0) {
            isError = true;
            errors.first_name_error = "Can not be left blank.";
        }
        //check the last_name field
        if (this.state.last_name.length <= 0) {
            isError = true;
            errors.last_name_error = "Can not be left blank.";
        }
        //check the username
        if (this.state.username.length < 3) {
            isError = true;
            errors.username_error = "Must be greater than 3 characters";
        }
        //chekc for a valid email
        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.email_error = "Please enter a valid email address.";
        }
        //check the password length
        if (this.state.password.length < 5) {
            isError = true;
            errors.password_error = "Must be greater than 5 characters."
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    onSubmit = e => {
        e.preventDefault();

        if (this.validate() === false) {
            Axios.post('/users', {
                fName: this.state.first_name,
                lName: this.state.last_name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
            .then(function(res) {
                if (res.data.errors) {
                    console.log(res.data.errors);
                } else if (res.data.message === 'Missing credentials') {
                    console.log(res.data.message);
                } else {
                    window.location = '/login';
                }
            })
            .catch(function(err) {
                console.log(err);
            })
        }
    };

    render() {
        return (
            <form className="RegistrationForm">
                <TextField
                    name="first_name"
                    label="First Name"
                    value={this.state.first_name}
                    onChange={e => this.change(e)}
                    error={this.state.first_name_error.length > 0 ? true : false}
                    helperText={this.state.first_name_error}
                    fullWidth={true}
                />
                <TextField
                    name="last_name"
                    label="Last Name"
                    value={this.state.last_name}
                    onChange={e => this.change(e)}
                    error={this.state.last_name_error.length > 0 ? true : false}
                    helperText={this.state.last_name_error}
                    fullWidth={true}
                />
                <TextField
                    name="username"
                    label="Username"
                    value={this.state.username}
                    onChange={e => this.change(e)}
                    error={this.state.username_error.length > 0 ? true : false}
                    helperText={this.state.username_error}
                    fullWidth={true}
                />
                <TextField
                    name="email"
                    label="Email"
                    value={this.state.email}
                    onChange={e => this.change(e)}
                    error={this.state.email_error.length > 0 ? true : false}
                    helperText={this.state.email_error}
                    fullWidth={true}
                />
                <TextField
                    name="password"
                    label="Password"
                    value={this.state.password}
                    onChange={e => this.change(e)}
                    type="password"
                    error={this.state.password_error.length > 0 ? true : false}
                    helperText={this.state.password_error}
                    fullWidth={true}
                />
                <Button
                    type="submit"
                    label="Submit"
                    onClick={e => this.onSubmit(e)}
                    variant="contained"
                    size="medium"
                    fullWidth={true}
                >Register</Button>
                <div>Already have an account? <Link to="/login">Login!</Link></div>
                <div>Or <Link to="/">Go Home</Link></div>
            </form>
        );
    }
}
export default RegistrationForm;