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


        const URLPost = '/friends/' + id_of_michael;
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

    onDelete = e => {
        const id_of_john = "5b73678b434bad64409d382c";
        const id_of_seymour = "5b73683a434bad64409d382d";
        const id_of_michael = "5b736897434bad64409d382e";
        const URLPost = '/friends/' + "5b73683a434bad64409d382d";


        e.preventDefault();

        console.log("Delete Button Pressed!");

        fetch(URLPost, {
            method: 'Delete'

        }).then(response => response.json());
    }

    onAccept = e => {

        const id_of_john = "5b73678b434bad64409d382c";
        const id_of_seymour = "5b73683a434bad64409d382d";
        const id_of_michael = "5b736897434bad64409d382e";

        const URLPost = '/friends/' + id_of_seymour;


        e.preventDefault();
        //accept Friend
        fetch(URLPost, {
            method: 'PUT', // or 'PUT' 
            headers: {
                //send the jsonwebtoken
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

        console.log("Pending Friend has been added!");
    }

    render(){
        var { isLoaded, friends, pendings } = this.state;

        if (!isLoaded) {
            return( <div>
                Loading...
            </div>
            );
        }
        else{
            return (
                    <div className="Friends">
                        <div className="Friends-only-Header">
                            Friends
                            {friends.map( (friend, index) => (
                            <List key={index}>
                                <ListItem button  >
                                    <IconButton onClick={e => this.onDelete(e)} aria-label="Delete">
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

                        <div className="Pending-only-Header">
                            Pending
                            {pendings.length == 0 ?
                            
                                <ul className ="pendingItem"> No Pending Requests </ul> :
                            
                                pendings.map( (pending, index) => (
                                    <List key={index}>
                                        <ListItem button  >
                                            <Button onClick={e => this.onAccept(e)} color="primary" aria-label="Add">
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