// import react components
import React, { Component } from "react";
import { Link } from 'react-router-dom';

// import components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from 'axios';

// import css
import './LoginForm.css';

class LoginForm extends Component {

    // initialize state:
    state = {
        email: "",
        password: "",
        error: ""
    };

    change = e => {
        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        
        Axios.post('/token', {
            email: this.state.email,
            password: this.state.password
        })
        .then(function(res) {
            if (!res.data.token) {
                throw new Error('Invalid Username or Password');
            } else {
                localStorage.setItem('token', res.data.token);
                window.location = '/map';
            }
        })
        .catch(err => {
            this.setState({
                error: 'Invalid Username or Password'
            });
        })
    };

    render() {
        return (
            <form className="LoginForm">
            {this.state.error.length > 0 ? <div className="error">{this.state.error}</div> : null}
                <TextField
                    name="email"
                    label="Email"
                    value={this.state.username}
                    onChange={e => this.change(e)}
                    error={this.state.error.length > 0 ? true : false}
                    fullWidth={true}
                />
                <TextField
                    name="password"
                    label="Password"
                    value={this.state.password}
                    onChange={e => this.change(e)}
                    type="password"
                    error={this.state.error.length > 0 ? true : false}
                    fullWidth={true}
                />
                <Button
                    type="submit"
                    label="Login"
                    onClick={e => this.onSubmit(e)}
                    variant="contained"
                    size="medium"
                    fullWidth={true}
                >Login</Button>
                <div>Don't have an account yet? <Link to="/register">Create one!</Link></div>
            </form>
        );
    }
}
export default LoginForm;