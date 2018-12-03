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

class OrderService{
    getOrders() {
        return db.orders;
    }
}

export default OrderService;
