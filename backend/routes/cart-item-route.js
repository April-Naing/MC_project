const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cart-item-controller");
const validate = require("../middleware/validate");
// const CartItemSchema = require("../schema/order-item-schema");
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");

router
  .route("/")
  .get(cartItemController.getAllCartItems)
  //   .post(validate(orderItemSchema, "body"), cartItemController.createCartItem);
  .post(cartItemController.createCartItem);

router
  .route("/user")
  .get(
    authController.protect,
    userController.getMe,
    cartItemController.getCartItemsByUser
  )
  .delete(
    authController.protect,
    userController.getMe,
    cartItemController.deleteAllCartItemByUser
  );

router
  .route("/:id")
  .get(cartItemController.getCartItem)
  .patch(cartItemController.updateCartItem)
  .delete(cartItemController.deleteCartItem);

router.route("/user/:id").get(cartItemController.getCartItemsByUser);
module.exports = router;
