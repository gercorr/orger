import React, { Component } from 'react';
import './OrderList.scss';
import Order from '../order/Order'
import ActionList from '../actionList/ActionList'
import OrderService from '../../services/OrderService'

class OrderList extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      ordersToRender: null,
      loading: true
    };
    this.retrieveOrders();
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
    return OrderService.deleteOrder(orderId).then(()=>{
      return this.retrieveOrders()
    })
  }

  onOrderSave(updatedObject){
    return OrderService.updateOrders(updatedObject).then(()=>{
      return this.retrieveOrders()
    })
  }

  retrieveOrders(){
    return OrderService.getOrders().then((orders) => {
      return this.renderOrders(orders)
    })
  }

  renderOrders(orders){
    const sortedOrders = orders.Items.sort((a, b) => {
      return a.time - b.time;
    });
    let renderableOrders = [];
    for (const order of sortedOrders) {
      renderableOrders.push(
        <div key={order.Id}>
          {<Order key={order.Id} Id={order.Id} details={order.details} time={order.time} onDeleteCallback={(orderId) => this.onOrderDelete(orderId)} onSaveCallback={(updatedObject) => this.onOrderSave(updatedObject)}/>}
        </div>
      );
    }
    this.setState({
      ordersToRender: renderableOrders
    })
  }
  

  render() {
    if(this.state.ordersToRender){
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
    return (
      <div className="OrderList">
        <i className="fa fa-spinner fa-spin"></i>
      </div>
    );
  }
}

export default OrderList;
