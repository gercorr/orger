import RestService from './RestService'
import generateGuid from 'uuid/v4'

export default {
    getOrders: () => {
        return RestService.get("?CompanyId=1").then((response) => {
          return response.json();
        })
    },

    deleteOrder: (orderId )=> {      
      return RestService.delete("?CompanyId=1&Id="+orderId);
    },

    updateOrders: (updatedObject)=> {
      updatedObject.Id = updatedObject.Id || generateGuid();
      const date = new Date();
      updatedObject.time = updatedObject.time || date.getTime();
      updatedObject.CompanyId = updatedObject.CompanyId || 1;
      return RestService.put(updatedObject);
    }
}

