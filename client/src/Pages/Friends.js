// Stuff to do:
// this component will show a list of "friends" the user is with.
// this component will show a list of "pending friends" of the userInfo

// this component will manage the list: update, delete, ... 

//Stuff to import:
//  friends from the user
//  pending friends from the user

import React, { Component } from "react";
import Axios from 'axios';
import './Friends.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


//friends list:

//ComponentDidMount()
var token = localStorage.getItem('token');
console.log("the token is: " + token);


//};

// ***************************************************

// //Pending Friends list:
// const pendingFriends = ["Pending #1", "Pending #2", "Pending #3","Pending #4"];
// const listPendingFriends = pendingFriends.map(pendingFriend => (
//     <List>
//         <ListItem button component={pendingFriend.id} href="">
//             <ListItemText primary={pendingFriend}  />
//         </ListItem>
//     </List>
//     )
// );
// const PendingFriendsList = props => (
//     <div className="Pending-only-List" key={props.pendingFriends.id} >
//         {props.pendingFriends}
//     </div>

// );
// ***************************************************

       // this.setState({
        //     fields: {
        //         ...this.state.fields,
        //         ...update
        //     }
        // });

class Friends extends Component {
    
    
    //state:
    state = {
        friends: {},
        pending: {}
    };
    //onChange stuff goes here:
    onSubmit = e => {
        e.preventDefault();
        const id_of_john = "5b73678b434bad64409d382c";
        const URLPost = '/friends/' + id_of_john;
        console.log("Add button pressed!");
        //send the URL 
        Axios.post(URLPost,
            {
                headers: {
                    //send the jsonwebtoken
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }

            })
            // .then(res => {
            //     console.log(JSON.stringify(res));
            // })
            //error
            .catch(err => {
                console.log("this err is: " + err)
            })
            .catch(err => {
                console.log(err)
            })

 
    };

    render() {
        //const friends = ["Friend #1", "Friend #2", "Friend #3", "Friend #4"];
        // const friends = this.state.friends;
        const friends = [];

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
        //console.log("the state of the object is: " + this.state.friends);


        return (
            <div className="Friends">
                <div className="Friends-only-Header">
                    Friends
                    <div className="Friends-only-List">
                        <FriendsList friends={listFriends} />
                        <Button onClick={e => this.onSubmit(e)} variant="fab" color="primary" aria-label="Add" className="addButton">
                            <AddIcon />
                            {/* <RegistrationForm onChange={fields => this.onChange(fields)} /> */}
                        </Button>
                    </div>

                </div>
                {/* <div className="Pending-Friends">
                    <div className="Pending-only-Header">
                        Pending Friends
                        <div className="Pending-only-List">
                            <PendingFriendsList pendingFriends={listPendingFriends}  />
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}
export default Friends;