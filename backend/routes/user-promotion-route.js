const express = require("express");
const router = express.Router();
const userPromotionController = require("../controllers/user-promotion-contoller");
// const validate = require("../middleware/validate");
const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");

router
  .route("/")
  .get(userPromotionController.getAllUserPromotions)
  //   .post(validate(couponSchema, "body"), userPromotionController.createCoupon);
  .post(userPromotionController.createUserPromotion);

router
  .route("/user")
  .get(
    authController.protect,
    userController.getMe,
    userPromotionController.getUserPromotionByUser
  );

router
  .route("/:id")
  .get(userPromotionController.getUserPromotion)
  .patch(userPromotionController.updateUserPromotion)
  .delete(userPromotionController.deleteUserPromotion);

module.exports = router;
