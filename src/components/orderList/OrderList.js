import React, { Component } from 'react';
import './OrderList.css';
import Order from '../order/Order'
import ActionList from '../actionList/ActionList'
import OrderService from '../../services/OrderService'

const db = {
  orders: [
    {
      id:1,
      details:"order one",
      time:"12/3/2018, 12:10:41 PM"
    },
    {
      id:2,
      details:"longer order two absajdfb asdkjfnb sadjfn asdjkfn",
      time:"12/3/2018, 12:10:41 PM"
    }
  ]
}

class OrderList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      ordersToRender: this.loadOrdersFromDb()
    };
  }

  onOrderCreate(){
    const orders = this.loadOrdersFromDb();
    orders.push(
      <div key="newOrder">
        {<Order editMode={true} key="newOrder" details="" onDeleteCallback={(orderId) => this.onOrderDelete(orderId)} onSaveCallback={(orderId, newValue) => this.onOrderSave(orderId, newValue)}/>}
      </div>
    );       

    this.setState({
      ordersToRender: orders
    })
  }

  onOrderDelete(orderId){
    console.log(orderId);
    db.orders = db.orders.filter(order => order.id !== orderId);
        
    this.setState({
      ordersToRender: this.loadOrdersFromDb()
    })
  }

  onOrderSave(orderId, newValue){
    console.log(orderId);    
    if(!orderId){
      const newId = Math.max.apply(Math, db.orders.map((order) => { return order.id; })) + 1;
      const date = new Date();
      const currentTime = date.toLocaleTimeString();
      const newOrder = {
        id: newId,
        details: newValue,
        time: currentTime
      }
      db.orders.push(newOrder)
    } else {
      var foundIndex = db.orders.findIndex(order => order.id === orderId);
      const newobj = {...db.orders[foundIndex], details: newValue}
      db.orders[foundIndex] = newobj;
    }
        
    this.setState({
      ordersToRender: this.loadOrdersFromDb()
    })
  }

  loadOrdersFromDb(){
    let orders = [];

    for (const order of db.orders) {
      orders.push(
        <div key={order.id}>
          {<Order key={order.id} id={order.id} details={order.details} time={order.time} onDeleteCallback={(orderId) => this.onOrderDelete(orderId)} onSaveCallback={(orderId, newValue) => this.onOrderSave(orderId, newValue)}/>}
        </div>
      );
    }

    return orders;
  }

  render() {
    return (
      <div className="OrderList">
        <div className="OrderList-Grid">
          {this.state.ordersToRender}
        </div>
        <div className="ActionList">
          <ActionList onCreateCallback={() => this.onOrderCreate()}/>
        </div>
      </div>
    );
  }
}

export default OrderList;
