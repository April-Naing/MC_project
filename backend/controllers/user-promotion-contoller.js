const catchAsync = require("../utils/catch-async");
const {
  getAllUserPromotionsService,
  getUserPromotionService,
  getUserPromotionsByUserService,
  createUserPromotionService,
  updateUserPromotionService,
  deleteUserPromotionService,
} = require("../services/user-promotion-service");
const Coupon = require("../models/coupon-model");

exports.getAllUserPromotions = catchAsync(async (req, res, next) => {
  const userPromoCoupons = await getAllUserPromotionsService();

  res.status(200).json({
    message: "Getting all user promo coupons successful.",
    userPromoCoupons,
  });
});

exports.getUserPromotion = catchAsync(async (req, res, next) => {
  const userPromoCoupon = await getUserPromotionService(req.params.id);

  console.log(userPromoCoupon);

  res.status(200).json({
    message: "Getting user promo coupon successful.",
    data: {
      userPromoCoupon,
    },
  });
});

exports.getUserPromotionByUser = catchAsync(async (req, res, next) => {
  const userPromoCoupon = await getUserPromotionsByUserService(req.params.id);

  const coupon = await Coupon.find();

  res.status(200).json({
    message: "Getting user promo coupon by user is successful.",
    data: userPromoCoupon,
  });
});

exports.createUserPromotion = catchAsync(async (req, res, next) => {
  console.log("body", req.body);
  const userPromoCoupon = await createUserPromotionService(req.body);
  console.log(userPromoCoupon);

  res.status(200).json({
    message: "Creating the user promo coupon is successful",
    data: {
      userPromoCoupon,
    },
  });
});

exports.updateUserPromotion = catchAsync(async (req, res, next) => {
  let userPromoCoupon = await updateUserPromotionService(
    req.params.id,
    req.body
  );

  if (userPromoCoupon.promotion.availableTime === userPromoCoupon.used_time) {
    userPromoCoupon = await deleteUserPromotionService(userPromoCoupon._id);
  }

  res.status(200).json({
    message: "Updating the user promo coupon is successful.",
    data: {
      userPromoCoupon,
    },
  });
});

exports.deleteUserPromotion = catchAsync(async (req, res, next) => {
  await deleteUserPromotionService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});
