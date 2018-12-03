import React, { Component } from 'react';
import ball from './ball.png';
import OrderList from '../orderList/OrderList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ball} className="App-logo" alt="logo" />
          <h1 className="App-title">Orger</h1>
        </header>
        <OrderList/>
      </div>
    );
  }
}

export default App;
