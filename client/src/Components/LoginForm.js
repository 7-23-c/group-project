import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import './LoginForm.css';

class LoginForm extends Component {

    // initialize state:
    state = {

        username: "",
        username_error: "",

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
        }
    };

    render() {
        return (
            <form className="LoginForm">


                <br />
                <TextField
                    name="username"
                    hintText="Username"
                    value={this.state.username}
                    onChange={e => this.change(e)}
                    errorText={this.state.username_error}
                    floatingLabelFixed
                />
                <br />
                <TextField
                    name="password"
                    hintText="Password"
                    value={this.state.password}
                    onChange={e => this.change(e)}
                    errorText={this.state.password_error}
                    type="password"
                    floatingLabelFixed
                />
                <br />
                <RaisedButton label="Login" onClick={e => this.onSubmit(e)} primary />
            </form>
        );
    }
}
export default LoginForm;