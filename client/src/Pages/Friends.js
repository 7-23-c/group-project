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

// import UsersList from '../Components/UsersList';
import Search from '../Components/Search';

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
        fetch('/friends', {
            method: 'GET',
            headers: {
                //send the jsonwebtoken
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ 
                    
                    friends: res.data.friends,
                    pendings: res.data.pending,
                    isLoaded: true,
                })
            })
            .catch(err => {
                this.setState({
                    isLoaded: true,
                })
                console.log('error')
            })
    }
    onSubmit = e => {
        e.preventDefault();

        const URLPost = '/friends/';

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
                                                    <div>

                            <Search />
                             </div>
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