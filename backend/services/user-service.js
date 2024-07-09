const User = require("../models/user-model");
const APIFeatures = require("../utils/api-features");
const AppError = require("../utils/app-error");

exports.getAllUserService = async (query) => {
  const feature = new APIFeatures(User.find(), query).paginate();

  const users = await feature.query;
  const totalUsers = await User.countDocuments();

  if (!users) {
    throw new AppError("There is no users", 404);
  }

  return { users, totalUsers };
};

exports.getUserService = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("There is no user with that ID", 404);
  }

  return user;
};

exports.createUserService = async (body) => {
  const user = await User.create(body);

  return user;
};

exports.updateUserService = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new AppError("There is no user with that ID", 404);
  }

  return user;
};

exports.deleteUserService = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError("There is no user with that ID", 404);
  }
  return user;
};
