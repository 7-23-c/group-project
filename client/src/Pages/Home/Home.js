import React from 'react';
import { Link } from 'react-router-dom';

import AppStoreBadge from '../../Images/app-store-badge.svg';
import PlayStoreBadge from '../../Images/play-store-badge.svg';

import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <nav className="main-navigation">
                    <div className="brand">
                        <Link to="/">Beacons</Link>
                    </div>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li>Or</li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </nav>

                <section className="main">
                    <div className="overlay">
                        <div>
                            <h1>Experience a New Way to Share Memories</h1>
                            <Link to="/"><img className="badge one" src={AppStoreBadge} alt="Get the app on the app store." /></Link>
                            <Link to="/"><img className="badge" src={PlayStoreBadge} alt="Get the app on the play store." /></Link>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Home;