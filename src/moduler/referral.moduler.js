const mongoose = require("mongoose");
const ReferralSchema = new mongoose.Schema({
    UserId : { type: mongoose.Schema.Types.ObjectId, ref:"User"},
    referralcode: {   //User's Own Reference Code
      type: String,
    },
    referrer_id: {    //Refer by user
        type: mongoose.Schema.Types.ObjectId, ref:"User"
    },
    referralcode : {
        type: String,
    },
    totalpoint: {
      type: Number,
      default : 0
    },
  },{
    timestamps: { default: Date.now() },
  });
  
  
  module.exports = ReferralSchema;