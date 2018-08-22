// import react components
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// import images
import AppStoreBadge from '../../Images/app-store-badge.svg';
import PlayStoreBadge from '../../Images/play-store-badge.svg';
import InAppPreview from '../../Images/InAppPreview.png';

// import css
import './Home.css';

class Home extends React.Component {
    render() {
        if (!this.props.isLoggedIn) {
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
        } else {
            return <Redirect to="/map" />
        }
    }
}

export default Home;