import React, { Component } from 'react';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Map from './Pages/Map';
//import Friends from './Pages/Friends';
import Navigation from './Components/Navbar';
import { Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    componentWillMount() {
        if (localStorage.getItem('token') !== null) {
            this.setState({
                isLoggedIn: true
            });
        }
    }

    render() {
        return (
            <div>
                <Navigation isLoggedIn={this.state.isLoggedIn} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/map" component={Map} />
                    <Route exact path="/register" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
            
        );
    }
}

export default App;
