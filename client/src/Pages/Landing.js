// import react components
import React, { Component } from 'react';
import AppStoreBadge from '../Images/app-store-badge.svg';
import PlayStoreBadge from '../Images/play-store-badge.svg';

// import css
import './Landing.css';

class Home extends Component {
    render() {
        return (
            <section className="hero">
                <div className="overlay">
                    <div>
                        <h1>Experience a New Way to Share Memories</h1>
                        <img src={AppStoreBadge} className="badge app-store" alt="Get it on the App Store" />
                        <img src={PlayStoreBadge} className="badge" alt="Get it on the Play Store" />
                    </div>
                </div>
            </section>
        )
    }
}

export default Home;