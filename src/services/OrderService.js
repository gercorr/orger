import RestService from './RestService'

export default {
    getOrders: () => {
        return RestService.get("?CompanyId=1").then((response) => {
          return response.json();
        })
    },

    deleteOrder: (localMemoryOrders, orderId )=> {
      localMemoryOrders.Item.Orders = localMemoryOrders.Item.Orders.filter(order => order.id !== orderId);
      
      RestService.put(localMemoryOrders.Item);
      return localMemoryOrders;
    },

    updateOrders: (localMemoryOrders, orderId, newValue )=> {
      if(!orderId){
        let newId = Math.max.apply(Math, localMemoryOrders.Item.Orders.map((order) => { return order.id; })) + 1;
        newId = isFinite(newId) ? newId : 1;
        const date = new Date();
        const currentTime = date.toLocaleTimeString();
        const newOrder = {
          id: newId,
          details: newValue,
          time: currentTime
        }
        localMemoryOrders.Item.Orders.push(newOrder)
      } else {
        var foundIndex = localMemoryOrders.Item.Orders.findIndex(order => order.id === orderId);
        const newobj = {...localMemoryOrders.Item.Orders[foundIndex], details: newValue}
        localMemoryOrders.Item.Orders[foundIndex] = newobj;
      }
      
      RestService.put(localMemoryOrders.Item);
      return localMemoryOrders;
    }
}

