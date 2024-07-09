const catchAsync = require("../utils/catch-async");
const {
  getAllUserCouponsService,
  getUserCouponService,
  createUserCouponService,
  getUserCouponByUserService,
  deleteUserCouponService,
  updateUserCouponService,
} = require("../services/user-coupon-service");
const Coupon = require("../models/coupon-model");

exports.getAllUserCoupons = catchAsync(async (req, res, next) => {
  const userCoupons = await getAllUserCouponsService();

  res.status(200).json({
    message: "Getting all user coupons successful.",
    userCoupons,
  });
});

exports.getUserCoupon = catchAsync(async (req, res, next) => {
  const userCoupon = await getUserCouponService(req.params.id);

  console.log(userCoupon);

  res.status(200).json({
    message: "Getting user coupon successful.",
    data: {
      userCoupon,
    },
  });
});

exports.getUserCouponByUser = catchAsync(async (req, res, next) => {
  const userCoupon = await getUserCouponByUserService(req.params.id);

  const coupon = await Coupon.find();

  res.status(200).json({
    message: "Getting user coupon by user is successful.",
    data: userCoupon,
  });
});

exports.createUserCoupon = catchAsync(async (req, res, next) => {
  const userCoupon = await createUserCouponService(req.body);

  res.status(200).json({
    message: "Creating the user coupon is successful",
    data: {
      userCoupon,
    },
  });
});

exports.updateUserCoupon = catchAsync(async (req, res, next) => {
  let userCoupon = await updateUserCouponService(req.params.id, req.body);

  if (userCoupon.coupon.availableTime === userCoupon.used_time) {
    userCoupon = await deleteUserCouponService(userCoupon._id);
  }

  res.status(200).json({
    message: "Updating the user coupon is successful.",
    data: {
      userCoupon,
    },
  });
});

exports.deleteUserCoupon = catchAsync(async (req, res, next) => {
  await deleteUserCouponService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});
