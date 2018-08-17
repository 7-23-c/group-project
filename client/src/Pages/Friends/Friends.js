// Stuff to do:
// this component will show a list of "friends" the user is with.
// this component will show a list of "pending friends" of the userInfo

// this component will manage the list: update, delete, ... 

//Stuff to import:
//  friends from the user
//  pending friends from the user

import React, { Component } from "react";
import Axios from 'axios';
// import './Friends.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//friends list:

const friends = ["Friend #1", "Friend #2", "Friend #3", "Friend #4"];
const listFriends = friends.map(friend => (
    <List >
        <ListItem button >
            <ListItemText primary={friend} />
        </ListItem>
    </List>)
    )
;
const FriendsList = props => (
    <div className="Friends-only-List"> 
        {props.friends} 
    </div>
);
// ***************************************************

//Pending Friends list:
const pendingFriends = ["Pending #1", "Pending #2", "Pending #3","Pending #4"];
const listPendingFriends = pendingFriends.map(pendingFriend => (
    <List>
        <ListItem button component={pendingFriend.id} href="">
            <ListItemText primary={pendingFriend}  />
        </ListItem>
    </List>
    )
);
const PendingFriendsList = props => (
    <div className="Pending-only-List" key={props.pendingFriends.id} >
        {props.pendingFriends}
    </div>

);
// ***************************************************


class Friends extends Component {

    render() {

        return (
            <div className="Friends">
                <div className="Friends-only-Header">
                    Friends
                    <div className="Friends-only-List">
                        <FriendsList  friends={listFriends} />
                    </div>
                </div>
                <div className="Pending-Friends">
                    <div className="Pending-only-Header">
                        Pending Friends
                        <div className="Pending-only-List">
                            <PendingFriendsList pendingFriends={listPendingFriends}  />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Friends;