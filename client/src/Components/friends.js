// Stuff to do:
// this component will show a list of "friends" the user is with.
// this component will show a list of "pending friends" of the userInfo

// this component will manage the list: update, delete, ... 

//Stuff to import:
//  UI stuff such as a list format
//  friends from the user
//  pending friends from the user

import React, { Component } from "react";
import Axios from 'axios';
import './Friends.css';

//friends list:
const friends = ["Friend #1", "Friend #2", "Friend #3", "Friend #4"];
const listFriends = friends.map(friend => (<li>{friend}</li>));
const FriendsList = props => (
    <li> {props.friends} </li>
);

//Pending Friends list:
const pendingFriends = ["Pending #1", "Pending #2", "Pending #3","Pending #4"];
const listPendingFriends = pendingFriends.map(pendingFriend => (<li>{pendingFriend}</li>));
const PendingFriendsList = props => (
    <li> {props.pendingFriends}</li>
);

class Friends extends Component {

    render() {
        return (
            <div className="Friends">
                <div className="Friends-only-Header">
                    Friends
                    <div className="Friends-only-List">
                        <FriendsList friends={listFriends} />
                    </div>
                </div>
                <div className="Pending-Friends">
                    <div className="Pending-only-Header">
                        Pending Friends
                        <div className="Pending-only-List">
                            <PendingFriendsList pendingFriends={listPendingFriends} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Friends;