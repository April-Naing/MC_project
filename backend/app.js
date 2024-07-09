const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth-route");
const productRoute = require("./routes/product-route");
const userRoute = require("./routes/user-route");
const orderItemRoute = require("./routes/order-item-route");
const orderRoute = require("./routes/order-route");
const couponRoute = require("./routes/coupon-route");
const promotionRoute = require("./routes/promotion-route");
const userRoleRoute = require("./routes/user-role-route");
const cartItemRoute = require("./routes/cart-item-route");
const userCouponRoute = require("./routes/user-coupon-route");
const userPromotionRoute = require("./routes/user-promotion-route");
const path = require("path");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
  next();
});

app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/orderItems", orderItemRoute);
app.use("/orders", orderRoute);
app.use("/coupons", couponRoute);
app.use("/promotions", promotionRoute);
app.use("/cartItems", cartItemRoute);
app.use("/userRole", userRoleRoute);
app.use("/user/coupons", userCouponRoute);
app.use("/user/promotions", userPromotionRoute);

module.exports = app;
