const { default: mongoose, Schema } = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  discounts: [
    {
      roleId: {
        type: Schema.Types.ObjectId,
        ref: "UserRole",
        required: true,
      },
      discountPercentage: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
