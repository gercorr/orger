import React, { Component } from 'react';
import './ActionList.scss';

class ActionList extends Component {

  constructor(props) {
    super(props);
  }

  createOrder(){
    this.props.onCreateCallback();
  }

  render() {
    return (
      <button className="btn" onClick={() => this.createOrder()}><i className="fa fa-plus-square"> New Order</i></button> 
    );
  }
}

export default ActionList;
