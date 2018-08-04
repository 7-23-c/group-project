import React, { Component } from 'react';
import Authentication from './Components/Authentication';
import NotFound from './Components/NotFound';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Authentication} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
