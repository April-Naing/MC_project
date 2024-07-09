const { default: mongoose } = require("mongoose");

const promotionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
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
  availableTime: {
    type: Number,
    required: true,
    default: 1,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
