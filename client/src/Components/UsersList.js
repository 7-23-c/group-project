import React, { Component } from "react";
import { Link } from 'react-router-dom';
import User from './User';

class UsersList extends Component{

    constructor(){
        super();
        this.state = {
            search: 'Search User'
        }
    }
    updateSearch(event){
        this.setState({ search: event.target.value.substr(0,20)});
    }

    render(){
        let filteredUsers = this.props.users.filter(
            (user) => {
                return user.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
            <div>
                <input type="text"
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)} />
                <ul>
                    { this.props.map((user) => {
                        return <User user={user} key={user._id}/> 
                    })}
                    <li>{this.props.users.name}</li>
                </ul>

            </div>
        )
    }


}
export default UsersList;