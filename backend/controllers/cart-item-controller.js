const CartItem = require("../models/order-item-model");
const catchAsync = require("../utils/catch-async");
const {
  getAllCartItemsService,
  getCartItemService,
  getCartItemsByUserService,
  createCartItemService,
  updateCartItemService,
  deleteCartItemService,
  deleteAllCartItemsByUserService,
} = require("../services/cart-item-service");

exports.getAllCartItems = catchAsync(async (req, res, next) => {
  const cartItem = await getAllCartItemsService();

  res.status(200).json({
    message: "Getting the cart item is successful.",
    data: {
      cartItem,
    },
  });
});

exports.getCartItem = catchAsync(async (req, res, next) => {
  const cartItem = await getCartItemService(req.params.id);

  res.status(200).json({
    message: "Getting the cart item is successful.",
    data: cartItem,
  });
});

exports.getCartItemsByUser = catchAsync(async (req, res, next) => {
  const CartItems = await getCartItemsByUserService(req.params.id);

  res.status(200).json({
    message: "Getting the cart items by user is successful",
    data: CartItems,
  });
});

exports.createCartItem = catchAsync(async (req, res, next) => {
  const cartItem = await createCartItemService(req.body);

  res.status(200).json({
    message: "Creating the cart item is successful",
    data: {
      cartItem,
    },
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const cartItem = await updateCartItemService(req.params.id, req.body);

  res.status(200).json({
    message: "Updating the cart item is successful",
    data: {
      cartItem,
    },
  });
});

exports.deleteCartItem = catchAsync(async (req, res, next) => {
  await deleteCartItemService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});

exports.deleteAllCartItemByUser = catchAsync(async (req, res, next) => {
  await deleteAllCartItemsByUserService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});
