import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Map extends Component {
    render() {
        if (localStorage.getItem('token') === null) {
            return <Redirect to='/login' />
        } else {
            return (
                <h3>Map</h3>
            )
        }
    }
}

export default Map;