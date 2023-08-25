const express = require('express');
const router = express.Router();
const status = require('http-status');
const orderController = require('../controller/order.controller');
const httpStatus = require('http-status');
const Joi = require('joi')
const verifyToken= require('../../utils/Middleware/verifyToken')


router.post('',orderValidate,verifyToken,orderController.createOrder);

router.get('/:id',verifyToken,orderController.getOrder);


var orderJoiValidation = Joi.object().keys({
    customerName: Joi.string().required().error(new Error('customerName required')),
    totalAmount: Joi.string().required().error(new Error('totalAmount required')),
    UserId:Joi.string().required().error(new Error('UserId required')),
}).unknown()

function orderValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = orderJoiValidation.validate(Data)
    if (error) {
        return res.status(status.BAD_REQUEST).json({message : error.message,status:httpStatus.BAD_REQUEST})
    } else {
        return next();
    }
}
module.exports = router;