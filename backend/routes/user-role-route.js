const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/user-role-controller");
const validate = require("../middleware/validate");
// const promotionSchema = require("../schema/promotion-schema");

router
  .route("/")
  .get(userRoleController.getAllUserRoles)
  .post(userRoleController.createUserRole);

router.post("/updateUserRole", userRoleController.updateSpecificUserRole);

router
  .route("/:id")
  .get(userRoleController.getUserRole)
  .patch(userRoleController.updateUserRole)
  .delete(userRoleController.deleteUserRole);

module.exports = router;
