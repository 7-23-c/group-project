import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './RegistrationForm.css';
import { Link } from 'react-router-dom';

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
            errors.first_name_error = "Do not leave this field blank";
        }
        //check the last_name field
        if (this.state.last_name.length <= 0) {
            isError = true;
            errors.last_name_error = "Do not leave this field blank";
        }
        //check the username
        if (this.state.username.length < 4) {
            isError = true;
            errors.username_error = "Username needs to be atleast 4 characters long";
        }
        //chekc for a valid email
        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.email_error = "Please enter a valid email address";
        }
        //check the password length
        if (this.state.password.length < 5) {
            isError = true;
            errors.password_error = "Password is not strong enough. Please enter a longer password"
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    onSubmit = e => {
        e.preventDefault();
        // TODO: submit stuff (send url to the database)
        // this.props.onSubmit(this.state);
        const err = this.validate();
        if (!err) {
            // clear form after the onSubmit()
            this.setState({
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
            });
            this.props.onChange({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                password: ""
            });
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
                />
                <TextField
                    name="last_name"
                    label="Last Name"
                    value={this.state.last_name}
                    onChange={e => this.change(e)}
                />
                <TextField
                    name="username"
                    label="Username"
                    value={this.state.username}
                    onChange={e => this.change(e)}
                />
                <TextField
                    name="email"
                    label="Email"
                    value={this.state.email}
                    onChange={e => this.change(e)}
                />
                <TextField
                    name="password"
                    label="Password"
                    value={this.state.password}
                    onChange={e => this.change(e)}
                    type="password"
                />
                <Button type="submit" label="Submit" onClick={e => this.onSubmit(e)} variant="contained" size="medium">Register</Button>
                <div>Already have an account? <Link to="/login">Login!</Link></div>
            </form>
        );
    }
}
export default RegistrationForm;