const User= require('./src/router/user.router');
const Order= require('./src/router/order.router');


module.exports = function routes(app){
    app.use('/api/user/',User)
    app.use('/api/order/',Order)
}