import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from 'react-live-clock';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my pipeline</h1>
          <Clock/>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          test
        </p>
      </div>
    );
  }
}

export default App;
