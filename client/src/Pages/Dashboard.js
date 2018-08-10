import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../Components/Navbar';

class Dashboard extends Component {
    render() {
        if (localStorage.getItem('token') === null) {
            return <Redirect to='/login' />
        } else {
            return (
                <div>
                    <Navigation />
                </div>
            )
        }
    }
}

export default Dashboard;