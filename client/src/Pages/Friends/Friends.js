import React from "react";
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SpyGlass from '@material-ui/icons/ControlPoint';
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
    }

    componentWillMount() {
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
        Axios.get(`/friends?friend=${this.state.search}`)
        .then(res => {
            Axios.post(`/friends/${res.data.friend.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.setState({
                    success: res.data.success,
                });
            })
        })
        .catch(err => {
            this.setState({
                error: err.response.error,
            })
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addFriend(id) {
        Axios.put(`/friends/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            this.setState({
                success: res.data.success
            })
        })
        .catch(err => {
            this.setState({
                error: err.response.error
            })
        })
    }

    render() {
        let friends = this.state.friends.map((friend, key) => {
            return (
                <ListItem key={key}>
                    <ListItemText primary={friend.username} />
                </ListItem>
            )
        })

        let pending = this.state.pending.map((pending, key) => {
            return (
                <ListItem key={key}>
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
                        <div>
                            <h3>Friends</h3>
                            <List>
                                {friends}
                            </List>
                        </div>
                        <div>
                            <h3>Pending</h3>
                            <List>
                                {pending}
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Friends;