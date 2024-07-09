const catchAsync = require("../utils/catch-async");
const {
  getAllUserService,
  getUserService,
  createUserService,
  updateUserService,
  deleteUserService,
} = require("../services/user-service");
const User = require("../models/user-model");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const query = req.query;
  const { users, totalUsers } = await getAllUserService(query);

  res.status(200).json({
    message: "Getting all users successful.",
    users,
    totalUsers,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await getUserService(req.params.id);

  res.status(200).json({
    message: "Getting user successful.",
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await createUserService(req.body);

  if (!user.role) {
    const updateUser = await updateUserService(user._id, {
      role: "668226eb0c63c85b9912074e",
    });
  }

  res.status(200).json({
    message: "Creating the user is successful",
    data: {
      user,
      // updateUser: updateUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await updateUserService(req.params.id, req.body);

  res.status(200).json({
    message: "Updating the user is successful.",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await deleteUserService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});
