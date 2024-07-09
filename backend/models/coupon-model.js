const { default: mongoose } = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  availableTime: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
