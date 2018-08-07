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

class Friends extends Component {

    // const friends = ["friend #1", "friend #2", "friend #3"];
    // const pendingFriends = ["Pending #1", "Pending #2", "Pending #3"]

    render() {
        return (
            <div className="Friends">
                <div className="Friends-only">
                Friends: 
                    <div>
                        {/* TODO: lists the items that are in the 'friends' array */}

                        friend #1,
                        friend #2,
                        friend #3
                    </div>
                </div>
                <div className="Pending-only">
                    Pending Friends:
                    <div>
                        Pending Friend #1,
                        Pending Friend #2,
                        Pending Friend #3
                    </div>
                </div>
            </div>

        );
    }
}
export default Friends;