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


//friends list:

//ComponentDidMount()

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

    render() {
        const friends = ["Friend#1", "Friend#2", "Friend#3", "Friend#4"];
        // const friends = this.state.friends;
        //const friends = [];


        const listFriends = friends.map( (friend,index) => {
            return(
                <List key={index}>
                    <ListItem button  >
                        <IconButton aria-label="Delete">
                            <DeleteIcon className="deleteIcon" />
                        </IconButton>
                        <li class="friendItem">{friend} </li>
                        </ListItem>
                </List>
            )
        });

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
                        {console.log(listFriends)}
                        <Button onClick={e => this.onSubmit(e)} variant="fab" color="primary" aria-label="Add" className="addButton">
                            <AddIcon />
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