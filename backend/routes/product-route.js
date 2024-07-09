const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const authController = require("../controllers/auth-controller");
const validate = require("../middleware/validate");
const productSchema = require("../schema/product-schema");
const upload = require("../middleware/imageUpload");

router
  .route("/")
  .get(authController.protect, productController.getAllProducts)
  .post(upload.uploadImage, productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    upload.uploadImage,
    productController.updateProductImage,
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

module.exports = router;
