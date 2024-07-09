const { default: mongoose } = require("mongoose");
const OrderItem = require("./order-item-model");
const User = require("./user-model");

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "OrderItem",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  pointsEarned: {
    type: Number,
    required: true,
    default: 0,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "orderItems",
    select: "product quantity price",
  }).populate({
    path: "user",
    select: "name",
  });

  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
