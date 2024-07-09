const catchAsync = require("../utils/catch-async");
const {
  getAllOrdersService,
  getOrderService,
  getOrderByUserService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
} = require("../services/order-service");
const CartItem = require("../models/cart-item-model");
const Product = require("../models/product-model");
const OrderItem = require("../models/order-item-model");
const User = require("../models/user-model");
const Order = require("../models/order-model");
const { updateUserService } = require("../services/user-service");
const { updateUserRole } = require("../utils/update-user-role");
const {
  updateSpecificUserRole,
} = require("../controllers/user-role-controller");

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const query = req.query;
  const { orders, totalOrders } = await getAllOrdersService(query);

  res.status(200).json({
    message: "Getting the orders is successful.",
    data: {
      orders,
      totalOrders,
    },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await getOrderService(req.params.id);

  res.status(200).json({
    message: "Getting the order  is successful.",
    data: order,
  });
});

exports.getOrderByUser = catchAsync(async (req, res, next) => {
  const order = await getOrderByUserService(req.params.userId);

  res.status(200).json({
    message: "Getting the order by user is successful",
    data: order,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const order = await createOrderService(req.body);

  res.status(200).json({
    message: "Creating order is successful.",
    data: order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await updateOrderService(req.params.id, req.body);

  res.status(200).json({
    message: "Updating the order is successful",
    data: {
      order,
    },
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  await deleteOrderService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});

exports.createOrderByUser = catchAsync(async (req, res) => {
  const { userId } = req.body;

  try {
    const cartItems = await CartItem.find({ user: userId });

    if (!cartItems.length) {
      return res.status(400).send("No items in cart");
    }

    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        return new OrderItem({
          order: null,
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.originalPrice,
        }).save();
      })
    );

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const user = await User.findById(userId);
    // if (!user.role) {
    //   await updateUserService(user._id, {
    //     role: "668226eb0c63c85b9912074e",
    //   });
    // }

    let pointsEarned = 0;
    if (user.role) {
      pointsEarned =
        orderItems.reduce((sum, item) => sum + item.quantity, 0) *
        user.role.pointMultiplier;
    }

    const order = new Order({
      user: userId,
      orderItems: orderItems.map((item) => item._id),
      totalAmount,
      pointsEarned,
    });

    await order.save();

    await OrderItem.updateMany(
      { _id: { $in: orderItems.map((item) => item._id) } },
      { orderId: order._id }
    );

    await CartItem.deleteMany({ user: userId });

    user.point += pointsEarned;
    await user.save();

    // // Update the user's role based on the new points
    const newRole = await updateUserRole(user._id);

    if (user.role && user.role.role !== "admin") {
      if (newRole._id.toString() !== user.role._id.toString()) {
        await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
      }
    } else {
      await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
    }

    res.status(201).json({ message: "Success", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Fail" });
  }
});
