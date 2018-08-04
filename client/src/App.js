import React, { Component } from 'react';
import Registration from './Components/Registration';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-header">Beacons</h1>
        </header>
        <Registration />
      </div>
    );
  }
}

export default App;
