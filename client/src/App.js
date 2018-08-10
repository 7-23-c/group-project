import React, { Component } from 'react';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Dashboard from './Pages/Dashboard';
import Logout from './Pages/Logout';
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
