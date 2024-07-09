const OrderItem = require("../models/order-item-model");
const AppError = require("../utils/app-error");

exports.getAllOrderItemsService = async () => {
  const orderItems = await OrderItem.find();

  if (!orderItems) {
    throw new AppError("There is no orderItems", 404);
  }

  return orderItems;
};

exports.getOrderItemService = async (id) => {
  const orderItem = await OrderItem.findById(id);

  if (!orderItem) {
    throw new AppError("There is no orderItem with that ID", 404);
  }

  return orderItem;
};

exports.getOrderItemsByUserService = async (id) => {
  const orderItems = await OrderItem.find({ user: id });

  if (!orderItems) {
    throw new AppError(
      "There is no order items that ordered by this user.",
      404
    );
  }

  return orderItems;
};

exports.createOrderItemService = async (body) => {
  const orderItem = await OrderItem.create(body);

  return orderItem;
};

exports.updateOrderItemService = async (id, body) => {
  const orderItem = await OrderItem.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!orderItem) {
    throw new AppError("There is no orderItem with that ID", 404);
  }

  return orderItem;
};

exports.deleteOrderItemService = async (id) => {
  const orderItem = await OrderItem.findByIdAndDelete(id);

  if (!orderItem) {
    throw new AppError("There is no orderItem with that ID", 404);
  }
  return orderItem;
};
