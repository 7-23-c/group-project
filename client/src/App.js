import React, { Component } from 'react';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Home from './Components/Home';
import NotFound from './Components/NotFound';
import { Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
