const express = require("express");
const router = express.Router();
const couponController = require("../controllers/coupon-controller");
const validate = require("../middleware/validate");
const couponSchema = require("../schema/coupon-schema");

router
  .route("/")
  .get(couponController.getAllCoupons)
  .post(validate(couponSchema, "body"), couponController.createCoupon);

router
  .route("/:id")
  .get(couponController.getCoupon)
  .patch(couponController.updateCoupon)
  .delete(couponController.deleteCoupon);

router.route("/code/:code").get(couponController.getCouponByCode);

module.exports = router;
