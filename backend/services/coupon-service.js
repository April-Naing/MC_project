const Coupon = require("../models/coupon-model");
const AppError = require("../utils/app-error");

exports.getAllCouponsService = async () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const coupons = await Coupon.find({ endDate: { $gte: currentDate } });

  if (!coupons) {
    throw new AppError("There is no coupons", 404);
  }

  return coupons;
};

exports.getCouponService = async (id) => {
  const coupon = await Coupon.findById(id);

  if (!coupon) {
    throw new AppError("There is no coupon with that ID", 404);
  }

  return coupon;
};

exports.getCouponByCodeService = async (code) => {
  const coupon = await Coupon.findOne({ code: code });

  if (!coupon) {
    throw new AppError("There is no coupon with that name", 404);
  }

  return coupon;
};

exports.createCouponService = async (body) => {
  const coupon = await Coupon.create(body);

  return coupon;
};

exports.updateCouponService = async (id, body) => {
  const coupon = await Coupon.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!coupon) {
    throw new AppError("There is no coupon with that ID", 404);
  }

  return coupon;
};

exports.deleteCouponService = async (id) => {
  const coupon = await Coupon.findByIdAndDelete(id);

  if (!coupon) {
    throw new AppError("There is no coupon with that ID", 404);
  }
  return coupon;
};
