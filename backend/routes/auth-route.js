const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.route("/signin").post(authController.signIn);

router.route("/login").post(authController.logIn);
router.route("/logout").get(authController.logOut);

module.exports = router;
