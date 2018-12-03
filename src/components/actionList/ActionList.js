import React, { Component } from 'react';
import './ActionList.css';

class ActionList extends Component {

  constructor(props) {
    super(props);
  }

  createOrder(){
    this.props.onCreateCallback();
  }

  render() {
    return (
      <button onClick={() => this.createOrder()}>New Order</button> 
    );
  }
}

export default ActionList;
