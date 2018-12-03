import React, { Component } from 'react';
import OrderList from '../orderList/OrderList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
           <i className="fa far fa-4x fa-list-alt"></i>
          <h1 className="App-title">Orger</h1>
        </header>
        <OrderList/>
      </div>
    );
  }
}

export default App;