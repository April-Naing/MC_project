const { default: mongoose } = require("mongoose");

const userCouponSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  coupon: {
    type: mongoose.Schema.ObjectId,
    ref: "Coupon",
  },
  used_time: {
    type: Number,
    required: true,
    default: 0,
  },
});

userCouponSchema.pre(/^find/, function (next) {
  this.populate({
    path: "coupon",
    select: "code startDate endDate discountPrice availableTime",
  });

  next();
});
const UserCoupon = mongoose.model("UserCoupon", userCouponSchema);

module.exports = UserCoupon;
