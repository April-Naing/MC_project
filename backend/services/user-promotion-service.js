const AppError = require("../utils/app-error");
const UserPromotion = require("../models/user-promotion-model");

exports.getAllUserPromotionsService = async () => {
  const userPromoCoupons = await UserPromotion.find();

  if (!userPromoCoupons) {
    throw new AppError("There is no promotion coupons.", 404);
  }

  return userPromoCoupons;
};

exports.getUserPromotionService = async (id) => {
  const userPromoCoupon = await UserPromotion.findById(id);

  if (!userPromoCoupon) {
    throw new AppError("There is no user coupon with that ID", 404);
  }

  return userPromoCoupon;
};

exports.getUserPromotionsByUserService = async (id) => {
  const promoCoupon = await UserPromotion.find({ user: id });

  if (!promoCoupon) {
    throw new AppError("There is no promoCoupon with that name", 404);
  }

  return promoCoupon;
};

exports.createUserPromotionService = async (body) => {
  const userPromoCoupon = await UserPromotion.create(body);

  return userPromoCoupon;
};

exports.updateUserPromotionService = async (id, body) => {
  const userPromoCoupon = await UserPromotion.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!userPromoCoupon) {
    throw new AppError("There is no user coupon with that ID", 404);
  }

  return userPromoCoupon;
};

exports.deleteUserPromotionService = async (id) => {
  const userPromoCoupon = await UserPromotion.findByIdAndDelete(id);

  if (!userPromoCoupon) {
    throw new AppError("There is no user coupon with that ID", 404);
  }
  return userPromoCoupon;
};
