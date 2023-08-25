const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    email : {
      type: String,
    },
    password : {
      type: String,
    },
    // referralcode: {   //User's Own Reference Code
    //   type: String,
    // },
    // referrer: {    //Refer by user
    //   type: String,
    // },
    // totalpoint: {
    //   type: Number,
    //   default : 0
    // },
  },{
    timestamps: { default: Date.now() },
  });
  
  
  module.exports = UserSchema;