const UserCoupon = require("../models/user-coupon-model");
const AppError = require("../utils/app-error");

exports.getAllUserCouponsService = async () => {
  const userCoupons = await UserCoupon.find();

  if (!userCoupons) {
    throw new AppError("There is no user coupons", 404);
  }

  return userCoupons;
};

exports.getUserCouponService = async (id) => {
  const userCoupon = await UserCoupon.findById(id);

  if (!userCoupon) {
    throw new AppError("There is no user coupon with that ID", 404);
  }

  return userCoupon;
};

exports.getUserCouponByUserService = async (id) => {
  const coupon = await UserCoupon.find({ user: id });

  if (!coupon) {
    throw new AppError("There is no coupon with that name", 404);
  }

  return coupon;
};

exports.createUserCouponService = async (body) => {
  const userCoupon = await UserCoupon.create(body);

  return userCoupon;
};

exports.updateUserCouponService = async (id, body) => {
  const userCoupon = await UserCoupon.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!userCoupon) {
    throw new AppError("There is no user coupon with that ID", 404);
  }

  return userCoupon;
};

exports.deleteUserCouponService = async (id) => {
  const userCoupon = await UserCoupon.findByIdAndDelete(id);

  if (!userCoupon) {
    throw new AppError("There is no user coupon with that ID", 404);
  }
  return userCoupon;
};
