import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Axios from 'axios';

class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            pending: []
        }
    }

    componentWillMount() {
        Axios.get('/friends', {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res);
        })
    }

    render() {
        const friends = this.state.friends.map((friend, key) => {
            return (
                <ListItem button={true}>
                    <ListItemText primary={friend.username} />
                </ListItem>
            )
        });

        const pending = this.state.friends.map((pending, key) => {
            return (
                <ListItem button={true}>
                    <ListItemText primary={pending.username} />
                </ListItem>
            )
        });

        return(
            <div className="friends">
                <div>
                    <h3>My Friends</h3>
                    <List>{friends}</List>
                </div>
                <div>
                    <h3>Pending Requests</h3>
                    <List>{pending}</List>
                </div>
            </div>
        )
    }
}

export default Friends;