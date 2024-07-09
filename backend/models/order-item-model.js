const { default: mongoose } = require("mongoose");
const Product = require("./product-model");

const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
    },
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
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

// orderItemSchema.virtual("product", {
//   ref: "Product",
//   foreignField: "orderItem",
//   localField: "_id",
// });

orderItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "name originalPrice image",
  });

  next();
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
