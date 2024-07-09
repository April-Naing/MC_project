const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");
const validate = require("../middleware/validate");
const orderSchema = require("../schema/order-schema");
const authController = require("../controllers/auth-controller");

router
  .route("/")
  .get(authController.protect, orderController.getAllOrders)
  .post(validate(orderSchema, "body"), orderController.createOrder);

router.route("/user").post(orderController.createOrderByUser);

router.route("/:id").delete(orderController.deleteOrder);

router.route("/user/:userId").get(orderController.getOrderByUser);

module.exports = router;
