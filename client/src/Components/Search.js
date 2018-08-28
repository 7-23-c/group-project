import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SearchSuggestions from './SearchSuggestions';



class Search extends Component{

    state = {
        input: '',
        results: []
    }

    ///users?username="theusername"
    //get info
    getInfo = () => {
        fetch('/users/', {
            method: 'GET',
            headers: {
                //send the jsonwebtoken
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                results: res.data                       
            })
        });
    }

    handleInputChange = () => {
        this.setState({
            input: this.search.value
        }, () => {
            if (this.state.input && this.state.input.length > 9) {
                if (this.state.input.length % 2 === 0) {
                    this.getInfo()
                }
            }
        })
    }

    render(){
        return(
            <form>
                <input
                    placeholder = "Search User"
                    ref={input => this.search = input}
                    onChange = {this.handleInputChange}
                />
                <SearchSuggestions className = "friendItem" results={this.state.results} />
            </form>
        )

    }

}
export default Search;