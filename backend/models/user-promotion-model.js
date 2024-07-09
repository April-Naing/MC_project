const { default: mongoose } = require("mongoose");

const userPromotionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  promotion: {
    type: mongoose.Schema.ObjectId,
    ref: "Promotion",
    required: true,
    unique: true,
  },
  used_time: {
    type: Number,
    required: true,
    default: 0,
  },
});

userPromotionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "promotion",
    select: "code amount startDate endDate availableTime",
  });

  next();
});
const UserPromotion = mongoose.model("UserPromotion", userPromotionSchema);

module.exports = UserPromotion;
