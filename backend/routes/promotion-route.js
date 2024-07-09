const express = require("express");
const router = express.Router();
const promotionController = require("../controllers/promotion-controller");
const validate = require("../middleware/validate");
const promotionSchema = require("../schema/promotion-schema");

router
  .route("/")
  .get(promotionController.getAllPromotions)
  .post(validate(promotionSchema, "body"), promotionController.createPromotion);

router
  .route("/:id")
  .get(promotionController.getPromotion)
  .patch(promotionController.updatePromotion)
  .delete(promotionController.deletePromotion);

module.exports = router;
