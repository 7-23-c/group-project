import React from 'react';

import Axios from 'axios';
import Progress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './ForgotForm.css';

class ForgotForm extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            success_message: '',
            email: '',
            email_error: ''
        }
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.email.length < 1) {
            this.setState({
                email_error: 'Email can not be left blank.'
            })
        } else {
            this.setState({
                loading: true
            });
            Axios.put('/users/forgotpassword', {
                email: this.state.email
            })
            .then(res => {
                this.setState({
                    success_message: res.data.message,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false
                });
            })
        }
    }

    render() {
        return (
            <form className="ForgotForm">
            { this.state.loading
                ?   <Progress />
                :   null
            }
            { this.state.success_message.length > 0
                ?   <p className="success">{this.state.success_message}</p>
                :   null
            }
                <TextField
                    name="email"
                    label="Please enter your email"
                    value={this.state.email}
                    onChange={e => this.change(e)}
                    fullWidth={true}
                    error={this.state.email_error.length > 0 ? true : false}
                    helperText={this.state.email_error}
                />
                <Button
                    type="submit"
                    label="Login"
                    onClick={e => this.onSubmit(e)}
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth={true}
                >Reset Password</Button>
            </form>
        )
    }
}

export default ForgotForm;