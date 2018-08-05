import React, { Component } from 'react';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import Dashboard from './Components/Dashboard';
import Logout from './Components/Logout';
import { Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={Registration} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

export default App;
