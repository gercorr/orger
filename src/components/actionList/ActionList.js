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
      <button class="btn" onClick={() => this.createOrder()}><i class="fa fa-plus-square"> New Order</i></button> 
    );
  }
}

export default ActionList;
