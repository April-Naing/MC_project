const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/order-item-controller");
const validate = require("../middleware/validate");
const orderItemSchema = require("../schema/order-item-schema");
const authController = require("../controllers/auth-controller");
const userController = require("../controllers/user-controller");

router
  .route("/")
  .get(orderItemController.getAllOrderItems)
  .post(validate(orderItemSchema, "body"), orderItemController.createOrderItem);

router
  .route("/user")
  .get(
    authController.protect,
    userController.getMe,
    orderItemController.getOrderItemsByUser
  );

router
  .route("/:id")
  .get(orderItemController.getOrderItem)
  .patch(orderItemController.updateOrderItem);

router.route("/user/:id").get(orderItemController.getOrderItemsByUser);
module.exports = router;
