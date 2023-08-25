const express = require('express');
const router = express.Router();
const status = require('http-status');
const userController = require('../controller/user.controller');
const Joi = require('joi')
const httpStatus = require('http-status');
const verifyToken= require('../../utils/Middleware/verifyToken')

router.post('',userValidate,userController.createUser);

router.get('',verifyToken,userController.getAllUser);

router.post('/login',userController.userLogin);

router.get('/:id',verifyToken,userController.getuserById);

router.get('/wallet/:id',verifyToken,userController.getwalletById);



var userJoiValidation = Joi.object().keys({
    name: Joi.string().required().error(new Error('name required')),
    email: Joi.string().required().error(new Error('email required')),
    password: Joi.string().min(8).required().error(new Error('password required with minimum 8 character')),
}).unknown()

function userValidate(req, res, next) {
    const Data = req.body;
    const { error, result } = userJoiValidation.validate(Data)
    if (error) {
        return res.status(status.BAD_REQUEST).json({message : error.message,status:httpStatus.BAD_REQUEST})
    } else {
        return next();
    }
}
module.exports = router;