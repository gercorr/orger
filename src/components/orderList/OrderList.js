import React, { Component } from 'react';
import './OrderList.scss';
import Order from '../order/Order'
import ActionList from '../actionList/ActionList'
import OrderService from '../../services/OrderService'

class OrderList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      ordersToRender: this.retrieveOrders()
    };
  }

  onOrderCreate(){
    const orders = this.state.ordersToRender;
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
    const result = OrderService.deleteOrder(this.state.localMemoryOrders, orderId);
    this.renderOrders(result);
  }

  onOrderSave(orderId, newValue){
    const result = OrderService.updateOrders(this.state.localMemoryOrders, orderId, newValue);
    this.renderOrders(result);
  }

  retrieveOrders(){
    OrderService.getOrders().then((orders) => {
      this.renderOrders(orders)
    })
  }

  renderOrders(orders){
    let renderableOrders = [];
    for (const order of orders.Item.Orders) {
      renderableOrders.push(
        <div key={order.id}>
          {<Order key={order.id} id={order.id} details={order.details} time={order.time} onDeleteCallback={(orderId) => this.onOrderDelete(orderId)} onSaveCallback={(orderId, newValue) => this.onOrderSave(orderId, newValue)}/>}
        </div>
      );
    }
    this.setState({
      ordersToRender: renderableOrders,
      localMemoryOrders: orders
    })
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
