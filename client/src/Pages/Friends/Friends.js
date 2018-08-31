import React from "react";
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SpyGlass from '@material-ui/icons/ControlPoint';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import './Friends.css';

class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            search: '',
            friends: [],
            pending: [],
            success: '',
            error: ''
        }
        this.searchFriends = this.searchFriends.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
        this.getFriends = this.getFriends.bind(this);
    }

    componentWillMount() {
        this.getFriends();
    }

    getFriends() {
        Axios.get('/friends', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            this.setState({
                friends: res.data.friends,
                pending: res.data.pending
            })
        })
        .catch(err => {
            console.log('error');
        })
    }

    searchFriends() {
        Axios.get(`/friends?friend=${this.state.search}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            return Axios.post(`/friends/${res.data.friend.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
        })
        .then(res => {
            this.setState({
                success: res.data.success,
                error: ''
            });
        })
        .catch(err => {
            this.setState({
                success: '',
                error: err.response.data.error,
            })
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            success: '',
            error: ''
        })
    }

    addFriend(id) {
        Axios.put(`/friends/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            this.getFriends();
            this.setState({
                success: res.data.success,
                error: ''
            })
        })
        .catch(err => {
            this.setState({
                success: '',
                error: err.response.data.error
            })
        })
    }

    removeFriend(id) {
        Axios.delete(`/friends/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            this.getFriends();
            this.setState({
                error: '',
                success: res.data.success
            })
        })
        .catch(err => {
            this.setState({
                success: '',
                error: err.response.data.error
            })
        });
    }

    render() {
        let friends = this.state.friends.map((friend, key) => {
            return (
                <ListItem button={true} key={key}>
                    <ListItemText primary={friend.username} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.removeFriend(friend._id)}>
                            <RemoveIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })

        let pending = this.state.pending.map((pending, key) => {
            return (
                <ListItem button={true} key={key}>
                    <ListItemText primary={pending.username} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => this.addFriend(pending._id)}>
                            <SpyGlass />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        })

        return (
            <div className="Friends">
                <div className="FriendsList">
                    { this.state.success.length > 0 ? <p className="success">{this.state.success}</p>: null}
                    { this.state.error.length > 0 ? <p className="error">{this.state.error}</p> : null}
                    <form onSubmit={e => e.preventDefault()}>
                        <TextField
                            name="search"
                            fullWidth={true}
                            onChange={this.onChange}
                            label="Add your friends!"
                            error={this.state.searchSuccess ? true : false}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    type="submit"
                                    aria-label="Toggle password visibility"
                                    onClick={this.searchFriends}
                                >
                                    <SpyGlass />
                                </IconButton>
                                </InputAdornment>
                                )
                            }}
                        />
                    </form>
                    <div className="YourFriends">
                    { this.state.friends.length === 0 && this.state.pending.length === 0
                        ?   <div>
                                <h3>Looks like you have no friends yet, use the bar above to add one!</h3>
                            </div>
                        :   null
                    }
                    { this.state.friends.length > 0
                        ?   <div>
                                <h3>Friends</h3>
                                <List>
                                    {friends}
                                </List>
                            </div>
                        :   null
                    }
                    { this.state.pending.length > 0
                        ?   <div>
                                <h3>Pending</h3>
                                <List>
                                    {pending}
                                </List>
                            </div>
                        :   null
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default Friends;