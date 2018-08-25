import React from 'react';

import Axios from 'axios';
import Progress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import './ResetForm.css';

class ResetForm extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            success_message: '',
            password: '',
            password_error: '',
            show: false,
        }
        this.showPassword = this.showPassword.bind(this);
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.state.password.length <= 5) {
            this.setState({
                password_error: "Must be greater than 5 characters."
            });
        } else {
            this.setState({
                loading: true,
            });
            Axios.put('/users/resetpassword', {
                resetToken: this.props.token,
                newPassword: this.state.password
            })
            .then(res => {
                this.setState({
                    loading: false,
                    success_message: res.data.message
                });
            })
            .catch(() => {
                console.log('error');
            })
        } 
    }

    showPassword() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return (
            <form className="ResetForm">
            { this.state.loading
                ?   <Progress />
                :   null
            }
            { this.state.success_message.length > 0
                ?   <p className="success">{this.state.success_message}</p>
                :   null
            }
            { this.props.message
                ?   <p className="error">{this.props.message}</p>
                :   null
            }
                <TextField
                    type={ this.state.show
                        ?   'text'
                        :   'password'
                    }
                    name="password"
                    label="Enter a new password"
                    value={this.state.password}
                    onChange={e => this.change(e)}
                    fullWidth={true}
                    error={this.state.password_error.length > 0 ? true : false}
                    helperText={this.state.password_error}
                    disabled={ this.props.message.length > 0 ? true : false}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.showPassword}
                          >
                            {this.state.show ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                        )
                      }}
                />
                <Button
                    type="submit"
                    label="Login"
                    onClick={e => this.onSubmit(e)}
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth={true}
                    disabled={ this.props.message.length > 0 ? true : false}
                >Change Password</Button>
            </form>
        )
    }
}

export default ResetForm;