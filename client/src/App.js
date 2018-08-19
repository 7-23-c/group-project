// import react components
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import pages
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Map from './Pages/Map';
import Friends from './Pages/Friends';

// import custom components
import Navigation from './Components/Navbar';
import PrivateRoute from './Components/PrivateRoute';

// import css
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
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Registration} />
                    <PrivateRoute isLoggedIn={this.state.isLoggedIn} path="/map" component={Map} />
                    <PrivateRoute isLoggedIn={this.state.isLoggedIn} path="/friends" component={Friends} />
                    <Route path="*" component={NotFound} />

                </Switch>
            </React.Fragment>
            
        );
    }
}

export default App;
