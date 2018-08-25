// import react components
import React from "react";
import { Link } from 'react-router-dom';

// import components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Progress from '@material-ui/core/LinearProgress/LinearProgress';
import Axios from 'axios';

// import css
import './LoginForm.css';

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            loading: false,
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true,
        });
        Axios.post('/token', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            if (!res.data.token) {
                throw new Error('Invalid Username or Password');
            } else {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                this.setState({
                    loading: false,
                });
                window.location = '/map';
            }
        })
        .catch(err => {
            this.setState({
                error: 'Invalid Username or Password',
                loading: false,
            });
        })
    };

    render() {
        return (
            <form className="LoginForm">
            { this.state.loading
                ?   <Progress />
                :   null
            }
            { this.state.error.length > 0
                ?   <div className="error">{this.state.error}</div>
                :   null
            }
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
                    color="primary"
                    size="medium"
                    fullWidth={true}
                >Login</Button>

                <Button
                    variant="text"
                    label="Forgot password?"
                    fullWidth={true}
                    size="medium"
                    component={Link}
                    to="/forgotpassword"
                >
                    Forgot Password?
                </Button>

                <hr />

                <Button
                    label="Create an Account"
                    variant="contained"
                    color="secondary"
                    size="medium"
                    fullWidth={true}
                    component={Link}
                    to="/register"
                >Create an Account</Button>
            </form>
        );
    }
}
export default LoginForm;