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

class Friends extends Component{

    constructor(props){

        super(props);

        this.state = {
            items : [],
            friends: [],
            pendings: [],
            isLoaded: false,
        }
    }

    componentDidMount(){
        fetch('/friends/', {
            method: 'GET',
            headers: {
                //send the jsonwebtoken
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then(res => res.json())
            .then(res => {

                this.setState({ 
                    
                    friends: res.friends,
                    pendings: res.pending,
                    isLoaded: true,
                })
            });
    }
    onSubmit = e => {
        e.preventDefault();
        const id_of_john = "5b73678b434bad64409d382c";
        const id_of_seymour = "5b73683a434bad64409d382d";
        const id_of_michael = "5b736897434bad64409d382e";
        const my_id = "5b75f9d4a3ea5469678a7914";


        const URLPost = '/friends/' + id_of_john;
        console.log("Add button pressed!");


        fetch(URLPost, {
            method: 'POST', // or 'PUT' 
            headers: {
                //send the jsonwebtoken
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response))
    };

    onDelete = (e, friend) => {
        e.preventDefault();
        const URLPost = '/friends/' + friend._id;

        fetch(URLPost, {
            method: 'Delete',
            headers: {
                //send the jsonwebtoken
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    onAccept = (e, pending) => {
        e.preventDefault();
        const id_of_john = "5b73678b434bad64409d382c";
        const id_of_seymour = "5b73683a434bad64409d382d";
        const id_of_michael = "5b736897434bad64409d382e";

        const URLPost = '/friends/' + pending._id;

        //accept Friend
        fetch(URLPost, {
            method: 'PUT',
            headers: {
                //send the jsonwebtoken
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    render(){
        var { isLoaded, friends, pendings } = this.state;

        if (!isLoaded) {
            return (<div className="Friends-only-Header">
                Loading...
            </div>
            );
        }
        else{
            return (
                    <div className="Friends">
                        <div className="Friends-only-Header">
                            Friends
                            {friends.length == 0 ?

                            <ul className="pendingItem"> No current friends </ul> :

                            friends.map( (friend, index) => (
                            <List key={index}>
                                <ListItem button  >
                                    <IconButton onClick={(e) => this.onDelete(e, friend)} aria-label="Delete">
                                        <DeleteIcon className="deleteIcon" />
                                    </IconButton>
                                    <li className="friendItem">{friend.username} </li>
                                </ListItem>
                            </List>
                            ))}
                        <Button onClick={e => this.onSubmit(e)} variant="fab" color="primary" aria-label="Add" className="addButton">
                            <AddIcon />
                        </Button>
                        </div>
                        <br></br>


                        <div className="Pending-only-Header">
                            Pending
                            {pendings.length == 0 ?
                            
                                <ul className ="pendingItem"> No Pending Requests </ul> :
                            
                                pendings.map( (pending, index) => (
                                    <List key={index}>
                                        <ListItem button  >
                                            <Button onClick={ (e) => this.onAccept(e, pending)} color="primary" aria-label="Add">
                                                <AddIcon />
                                            </Button>
                                            <li className="pendingItem">
                                                {pending.username} 
                                            </li>
                                        </ListItem>
                                    </List>
                                ))
                        }   
                        </div>
                    </div> 
            );
        }
    }
}
export default Friends;