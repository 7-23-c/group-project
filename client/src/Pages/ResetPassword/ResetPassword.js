import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import Axios from 'axios';
import Progress from '@material-ui/core/CircularProgress';

import ResetForm from '../../Components/ResetForm/ResetForm';

import './ResetPassword.css';

class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            message: ''
        }
    }

    componentWillMount() {
        Axios.post('/reset-token', {
            resetToken: this.props.match.params.token
        })
        .then(res => {
            this.setState({
                ready: true
            });
        })
        .catch(err => {
            this.setState({
                ready: true,
                message: 'Password reset token expired'
            });
        });
    }

    render() {
        if (localStorage.getItem('token') !== null) {
            return <Redirect to='/map' />
        }

        if (!this.state.ready) {
            return (
                <div className="Progress">
                    <div className="loader">
                        <Progress size={80} />
                        <h3>Loading</h3>
                    </div>
                </div>
            );
        }

        return (
            <div className="ResetPassword">
                <div className="ResetPassword-header">
                    <Link to="/" className="Logo"><h1>Beacons</h1></Link>
                    <h2>Update Password</h2>
                    <ResetForm message={this.state.message} token={this.props.match.params.token}/>
                </div>
            </div>
        );
    }
}

export default ResetPassword;