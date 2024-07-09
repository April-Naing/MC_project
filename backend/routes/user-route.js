const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const userSchema = require("../schema/user-schema");
const validate = require("../middleware/validate");
const authController = require("../controllers/auth-controller");
// Protect all routes after this middleware
// router.use(authController.protect);

router
  .route("/")
  .get(authController.protect, userController.getAllUsers)
  .post(validate(userSchema, "body"), userController.createUser);

router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
