// import react components
import React from 'react';

// import components
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';


// import css
import './Settings.css';
import { Avatar } from '@material-ui/core';

class Settings extends React.Component {
    constructor() {
        super();
        this.user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            show: false,
            showPassword: false,
            password: '',
            password_error: '',
            snackOpen: false,
        }
        this.change = this.change.bind(this);
        this.showPassword = this.showPassword.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    deleteAccount = () => {
        var deleteIt = window.confirm('Are you sure you want to delete your account?');
        
        if (deleteIt) {
            Axios.delete(`/users/${this.user.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(success => {
                localStorage.clear();
                window.location = '/';
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    changePassword() {
        if (this.state.password.length <= 5) {
            this.setState({
                password_error: 'Password must be longer than 5 characters'
            });
        } else {
            Axios.put('/users', {
                password: this.state.password
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                this.setState({
                    show: !this.state.show,
                    snackOpen: true
                });
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    snackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ snackOpen: false });
    };

    render() {
        return (
            <div className="Settings">
                <div>
                    <h1>Profile</h1>
                    <div className="col">
                        <Avatar className="letters-avatar">{this.user.fName.slice(0,1) + this.user.lName.slice(0,1)}</Avatar>
                    </div>
                    <div className="col">
                       <span>Full Name <br/> <h3>{this.user.fName} {this.user.lName}</h3></span>
                        <hr/>
                        <span>Display Name <br/> <h3>{this.user.username}</h3></span> 
                        <hr/>
                        <span>Email Address <br/> <h3>{this.user.email}</h3></span> 
                        <hr/>
                        <span>Account Created <br/> <h3>{this.user.accountCreated}</h3></span>
                    </div>
                    <Collapse
                        in={this.state.show}
                    >
                        <TextField
                            name="password"
                            label="Password"
                            value={this.state.password}
                            onChange={e => this.change(e)}
                            type={ this.state.showPassword
                                    ?   "text"
                                    :   "password"
                                }
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.showPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                                )
                            }}
                            error={this.state.password_error.length > 0}
                            helperText={this.state.password_error}
                        />
                    </Collapse>
                    <Button
                        label="Change Password"
                        variant="text"
                        color="primary"
                        onClick={ this.state.show
                            ?   this.changePassword
                            :   () => this.setState({ show: !this.state.show })}
                    >Change Password</Button>
                    
                    <hr />
                    <h3>Danger Zone</h3>
                    <Button
                        label="Delete Account"
                        onClick={this.deleteAccount}
                        variant="contained"
                        color="secondary"
                    >Delete Account</Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackOpen}
                        autoHideDuration={6000}
                        onClose={this.snackClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Password Updated</span>}
                        action={[
                            <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.snackClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </div>
            </div>
        )
    }
}



export default Settings;