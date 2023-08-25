const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
    },
    UserId : { type: mongoose.Schema.Types.ObjectId, ref:"User"},
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    disAmount: {
      type: Number,
    },
    netAmount: {
      type: Number,
    },
  },
  {
    timestamps: { default: Date.now() },
  }
);

module.exports = OrderSchema;
