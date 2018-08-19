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
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



//ComponentDidMount()

//};
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
        const id_of_seymour = "5b73683a434bad64409d382d";
        const id_of_michael = "5b736897434bad64409d382e";


        const URLPost = '/friends/' + id_of_michael;
        console.log("Add button pressed!");
        //send the URL 
        // Axios.post(URLPost,
        //     {
        //         headers: {
        //             //send the jsonwebtoken
        //             Authorization: 'Bearer ' + localStorage.getItem('token')
        //         }

        //     })
        //     // .then(res => {
        //     //     console.log(JSON.stringify(res));
        //     // })
        //     //error
        //     .catch(err => {
        //         console.log("this err is: " + err)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
        //send the URL without axios:

        //const data = { headers: {Authorization: 'Bearer ' + localStorage.getItem('token')} };

        fetch(URLPost, {
            method: 'POST', // or 'PUT' 
            headers: {
                //send the jsonwebtoken
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        };
        onDelete = e => {
            e.preventDefault();
            console.log("Delete Button Pressed!");
        }
        onAccept = e => {
            e.preventDefault();
            console.log("Pending Friend has been added!");
        }

    render() {
// FRIENDS ***************************************************

       // const friends = ["Friend#1", "Friend#2", "Friend#3", "Friend#4"];
        // const friends = this.state.friends;
        const friends = [];

        const listFriends = friends.map( (friend,index) => {
            return(
                <List key={index}>
                    <ListItem button  >
                        <IconButton onClick={e => this.onDelete(e)}  aria-label="Delete">
                            <DeleteIcon className="deleteIcon" />
                        </IconButton>
                        <li className="friendItem">{friend} </li>
                        </ListItem>
                </List>
            )
        });

        const FriendsList = props => (
            <div className="Friends-only-List">
                {props.friends}
            </div>
        );
// END OF FRIENDS ***************************************************

// PENDING FRIENDS ***************************************************

//Pending Friends list:
    //const pendingFriends = ["Pending #1", "Pending #2", "Pending #3","Pending #4"];
    const pendingFriends = [];
    
    const listPendingFriends = pendingFriends.map( (pendingFriend,index) => {
        return(
        <List key = {index}>
            <ListItem button >
                    <Button   onClick={e => this.onAccept(e)}  color="primary" aria-label="Add">
                        <AddIcon />
                    </Button>
                    <li className = "pendingItem"> {pendingFriend} </li>
                {/* <ListItemText primary={pendingFriend} /> */}
            </ListItem>
        </List>
    )
    });

    const PendingFriendsList = props => (
        <div className="Pending-only-List" key={props.pendingFriends.id} >
            {props.pendingFriends}
        </div>

    );
// END OF PENDING FRIENDS ***************************************************


        //console.log("the state of the object is: " + this.state.friends);

        return (
            <div className="Friends">
                <div className="Friends-only-Header">
                    Friends
                    <div className="Friends-only-List">
                        <FriendsList friends={listFriends} />
                        <Button onClick={e => this.onSubmit(e)} variant="fab" color="primary" aria-label="Add" className="addButton">
                            <AddIcon />
                        </Button>
                    </div>

                </div>
                <div className="Pending-Friends">
                    <div className="Pending-only-Header">
                        Pending
                        <div className="Pending-only-List">
                            <PendingFriendsList pendingFriends={listPendingFriends}  />
                            {}
                            {/* {this.state.repos ? <p>Number of repos: {this.state.repos}</p> : <p>Please enter a username.</p>} */}
                            {this.state.pendingFriends ? <p> Pending Friend #1 </p> : <p> No Pending Requests </p>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Friends;