const CartItem = require("../models/cart-item-model");
const AppError = require("../utils/app-error");

exports.getAllCartItemsService = async () => {
  const cartItems = await CartItem.find();

  if (!cartItems) {
    throw new AppError("There is no cartItems", 404);
  }

  return cartItems;
};

exports.getCartItemService = async (id) => {
  const cartItem = await CartItem.findById(id);

  if (!cartItem) {
    throw new AppError("There is no cartItem with that ID", 404);
  }

  return cartItem;
};

exports.getCartItemsByUserService = async (id) => {
  const cartItems = await CartItem.find({ user: id });

  if (!cartItems) {
    throw new AppError(
      "There is no cart items that ordered by this user.",
      404
    );
  }

  return cartItems;
};

exports.deleteAllCartItemsByUserService = async (id) => {
  const cartItems = await CartItem.deleteMany({ user: id });

  if (!cartItems) {
    throw new AppError(
      "There is no cart items that ordered by this user.",
      404
    );
  }

  return cartItems;
};

exports.createCartItemService = async (body) => {
  const cartItem = await CartItem.create(body);

  return cartItem;
};

exports.updateCartItemService = async (id, body) => {
  const cartItem = await CartItem.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!cartItem) {
    throw new AppError("There is no cart item with that ID", 404);
  }

  return cartItem;
};

exports.deleteCartItemService = async (id) => {
  const cartItem = await CartItem.findByIdAndDelete(id);

  if (!cartItem) {
    throw new AppError("There is no cart item with that ID", 404);
  }
  return cartItem;
};
