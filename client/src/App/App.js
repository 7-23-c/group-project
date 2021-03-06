// import react components
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import pages
import Home from '../Pages/Home/Home';
import Registration from '../Pages/Registration/Registration';
import Login from '../Pages/Login/Login';
import NotFound from '../Pages/NotFound/NotFound';
import Map from '../Pages/Map/Map';
import Settings from '../Pages/Settings/Settings';
import Beacon from '../Pages/Beacon/Beacon';
import Beacons from '../Pages/Beacons/Beacons';
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword/ResetPassword';
import Friends from '../Pages/Friends/Friends';

// import custom components
import Navigation from '../Components/Navbar/Navbar';
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';

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
                { this.state.isLoggedIn
                    ?   <Navigation isLoggedIn={this.state.isLoggedIn} />
                    :   null
                }
                
                <Switch>
                    <Route exact path="/"
                    component={() => <Home isLoggedIn={this.state.isLoggedIn}/>} />

                    <Route exact path="/login" component={Login} />

                    <Route exact path="/register" component={Registration} />

                    <Route exact path="/forgotpassword" component={ForgotPassword} />
                    
                    <Route exact path="/resetpassword/:token" component={ResetPassword} />

                    <PrivateRoute
                    isLoggedIn={this.state.isLoggedIn}
                    exact path="/map" component={Map} />

                    <PrivateRoute
                    isLoggedIn={this.state.isLoggedIn}
                    exact path="/friends" component={Friends}/>

                    <PrivateRoute
                    isLoggedIn={this.state.isLoggedIn}
                    exact path="/beacons" component={Beacons}/>

                    <PrivateRoute isLoggedIn={this.state.isLoggedIn} exact path="/settings" component={Settings} />

                    <PrivateRoute isLoggedIn={this.state.isLoggedIn} path="/beacon/:id" component={Beacon} />

                    <Route path="*" component={() => <NotFound isLoggedIn={this.state.isLoggedIn} />} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default App;
