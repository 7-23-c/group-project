import React from 'react';
import { Redirect } from 'react-router-dom';

const Home = () => {
    if (localStorage.getItem('token') !== null) {
        return <Redirect to='/dashboard' />
    } else {
        return <Redirect to='/login' />
    }
}

export default Home;