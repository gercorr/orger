import RestService from './RestService'
import generateGuid from 'uuid/v4'

export default {
    getOrders: () => {
        return RestService.get("?CompanyId=1").then((response) => {
          return response.json();
        })
    },

    deleteOrder: (localMemoryOrders, orderId )=> {
      localMemoryOrders.Items = localMemoryOrders.Items.filter(order => order.Id !== orderId);
      
      RestService.delete("?CompanyId=1&Id="+orderId);
      return localMemoryOrders;
    },

    updateOrders: (localMemoryOrders, orderId, newValue )=> {
      let updatedOrder;
      if(!orderId){
        let newId = generateGuid();
        const date = new Date();
        const currentTime = date.toLocaleTimeString();
        updatedOrder = {
          CompanyId: 1,
          Id: newId,
          details: newValue,
          time: currentTime
        }
        localMemoryOrders.Items.push(updatedOrder);
        
      } else {
        var foundIndex = localMemoryOrders.Items.findIndex(order => order.Id === orderId);
        const updatedOrder = {...localMemoryOrders.Items[foundIndex], details: newValue}
        localMemoryOrders.Items[foundIndex] = updatedOrder;
      }      
      RestService.put(updatedOrder);
      
      return localMemoryOrders;
    }
}

