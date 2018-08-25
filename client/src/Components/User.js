import React, { Component } from "react";
import { Link } from 'react-router-dom';



class User extends Component{

    render(){
        return(
            <ul>
                {this.props.user.name}
            </ul>
        )
    }
}
export default User;