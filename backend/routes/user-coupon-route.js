const express = require("express");
const router = express.Router();
const userCouponController = require("../controllers/user-coupon-controller");
const validate = require("../middleware/validate");
const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");

router
  .route("/")
  .get(userCouponController.getAllUserCoupons)
  //   .post(validate(couponSchema, "body"), userCouponController.createCoupon);
  .post(userCouponController.createUserCoupon);

router
  .route("/user")
  .get(
    authController.protect,
    userController.getMe,
    userCouponController.getUserCouponByUser
  );

router
  .route("/:id")
  .get(userCouponController.getUserCoupon)
  .patch(userCouponController.updateUserCoupon)
  .delete(userCouponController.deleteUserCoupon);

module.exports = router;
