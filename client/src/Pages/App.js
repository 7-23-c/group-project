// import react components
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import pages
import Home from '../Home/Home';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Map from '../Map/Map';
import Settings from '../Settings/Settings';

// import custom components
import Navigation from '../../Components/Navbar/Navbar';
import PrivateRoute from '../../Components/PrivateRoute/PrivateRoute';

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
                    <Route exact path="/" component={() => <Home isLoggedIn={this.state.isLoggedIn}/>} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Registration} />
                    <PrivateRoute isLoggedIn={this.state.isLoggedIn} path="/map" component={Map} />
                    <PrivateRoute isLoggedIn={this.state.isLoggedIn} path="/settings" component={Settings} />
                    <Route path="*" component={() => <NotFound isLoggedIn={this.state.isLoggedIn} />} />
                </Switch>
            </React.Fragment>
            
        );
    }
}

export default App;
