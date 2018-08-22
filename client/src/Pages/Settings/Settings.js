// import react components
import React from 'react';

// import components
import Axios from 'axios';

// import css
import './Settings.css';

class Settings extends React.Component {
    constructor() {
        super();
        this.user = JSON.parse(localStorage.getItem('user'));
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

    render() {
        return (
            <div className="Settings">
                <div>
                    <h1>Profile</h1>
                    <hr />
                    <h3>Name: {this.user.fName} {this.user.lName}</h3>
                    <h3>Username: {this.user.username}</h3>
                    <h3>Email: {this.user.email}</h3>
                    <h3>Account Created: {this.user.accountCreated}</h3>
                    <button onClick={this.deleteAccount}>Delete Account</button>
                </div>
            </div>
        )
    }
}

export default Settings;