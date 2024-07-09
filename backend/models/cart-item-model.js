const { default: mongoose } = require("mongoose");
const Product = require("./product-model");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

// cartItemSchema.virtual("product", {
//   ref: "Product",
//   foreignField: "orderItem",
//   localField: "_id",
// });

cartItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "name originalPrice image discounts",
  }).populate({
    path: "user",
    select: "name role",
  });

  next();
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
