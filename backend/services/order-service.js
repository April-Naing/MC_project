const Order = require("../models/order-model");
const APIFeatures = require("../utils/api-features");
const AppError = require("../utils/app-error");

exports.getAllOrdersService = async (query) => {
  const feature = new APIFeatures(Order.find(), query).paginate();
  const orders = await feature.query;

  const totalOrders = await Order.countDocuments();

  if (!orders) {
    throw new AppError("There is no orders", 404);
  }

  return { orders, totalOrders };
};

exports.getOrderService = async (id) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new AppError("There is no order with that ID", 404);
  }

  return order;
};

exports.getOrderByUserService = async (userId) => {
  const order = await Order.findOne({ user: userId });

  if (!order) {
    throw new AppError("There is no orders that ordered by this user.", 404);
  }

  return order;
};

exports.createOrderService = async (body) => {
  const order = await Order.create(body);

  return order;
};

exports.updateOrderService = async (id, body) => {
  const order = await Order.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    throw new AppError("There is no order with that ID", 404);
  }

  return order;
};

exports.deleteOrderService = async (id) => {
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    throw new AppError("There is no order with that ID", 404);
  }
  return order;
};
