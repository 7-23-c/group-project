import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        if (localStorage.getItem('token') === null) {
            return <Redirect to='/login' />
        } else {
            return (
                <h1>Dashboard</h1>
            )
        }
    }
}

export default Dashboard;