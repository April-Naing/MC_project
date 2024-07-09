const catchAsync = require("../utils/catch-async");
const {
  getAllCouponsService,
  getCouponService,
  getCouponByCodeService,
  createCouponService,
  updateCouponService,
  deleteCouponService,
} = require("../services/coupon-service");

exports.getAllCoupons = catchAsync(async (req, res, next) => {
  const coupons = await getAllCouponsService();

  res.status(200).json({
    message: "Getting the Coupons is successful.",
    data: {
      coupons,
    },
  });
});

exports.getCoupon = catchAsync(async (req, res, next) => {
  const coupon = await getCouponService(req.params.id);

  res.status(200).json({
    message: "Getting the Coupon  is successful.",
    data: coupon,
  });
});

exports.getCouponByCode = catchAsync(async (req, res, next) => {
  const coupon = await getCouponByCodeService(req.params.code);

  res.status(200).json({
    message: "Getting coupon by code is successful.",
    data: coupon,
  });
});

exports.createCoupon = catchAsync(async (req, res, next) => {
  const coupon = await createCouponService(req.body);

  console.log(coupon);
  res.status(200).json({
    message: "Creating Coupon is successful.",
    data: coupon,
  });
});

exports.updateCoupon = catchAsync(async (req, res, next) => {
  const coupon = await updateCouponService(req.params.id, req.body);

  res.status(200).json({
    message: "Updating the Coupon is successful",
    data: {
      coupon,
    },
  });
});

exports.deleteCoupon = catchAsync(async (req, res, next) => {
  await deleteCouponService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});
