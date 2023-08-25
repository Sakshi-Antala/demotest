const mongoose = require('mongoose');
const order = mongoose.model('Order');

class orderService {
    static async createOrder(data){
        return order.create(data);
    }

    static async getOrder(id){
        return order.findOne({ _id: id }).populate('UserId');
    }
}

module.exports = orderService;