import React, { Component } from 'react';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Landing from './Pages/Landing';
import NotFound from './Pages/NotFound';
import Map from './Pages/Map';
//import Friends from './Pages/Friends';
import Navigation from './Components/Navbar';
import PrivateRoute from './Components/PrivateRoute';
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
            <React.Fragment>
                <Navigation isLoggedIn={this.state.isLoggedIn} />
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute isLoggedIn={this.state.isLoggedIn} path="/map" component={Map} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </React.Fragment>
            
        );
    }
}

export default App;
