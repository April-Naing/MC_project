const OrderItem = require("../models/order-item-model");
const catchAsync = require("../utils/catch-async");
const {
  getAllOrderItemsService,
  getOrderItemService,
  getOrderItemsByUserService,
  createOrderItemService,
  updateOrderItemService,
  deleteOrderItemService,
} = require("../services/order-item-service");

exports.getAllOrderItems = catchAsync(async (req, res, next) => {
  const orderItem = await getAllOrderItemsService();

  res.status(200).json({
    message: "Getting the order item is successful.",
    data: {
      orderItem,
    },
  });
});

exports.getOrderItem = catchAsync(async (req, res, next) => {
  const orderItem = await getOrderItemService(req.params.id);

  res.status(200).json({
    message: "Getting the order item is successful.",
    data: orderItem,
  });
});

exports.getOrderItemsByUser = catchAsync(async (req, res, next) => {
  const orderItems = await getOrderItemsByUserService(req.params.id);

  res.status(200).json({
    message: "Getting the order items by user is successful",
    data: orderItems,
  });
});

exports.createOrderItem = catchAsync(async (req, res, next) => {
  const orderItem = await createOrderItemService(req.body);

  res.status(200).json({
    message: "Creating the order item is successful",
    data: {
      orderItem,
    },
  });
});

exports.updateOrderItem = catchAsync(async (req, res, next) => {
  const orderItem = await updateOrderItemService(req.params.id, req.body);

  res.status(200).json({
    message: "Updating the order item is successful",
    data: {
      orderItem,
    },
  });
});

exports.deleteOrderItem = catchAsync(async (req, res, next) => {
  await deleteOrderItemService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});
