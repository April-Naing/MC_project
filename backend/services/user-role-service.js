const User = require("../models/user-model");
const UserRole = require("../models/user-role-model");
const APIFeatures = require("../utils/api-features");
const AppError = require("../utils/app-error");

exports.getAllUserRolesService = async (query) => {
  const feature = new APIFeatures(UserRole.find(), query).paginate();
  const userRoles = await feature.query;

  const totalRoles = await UserRole.countDocuments();
  if (!userRoles) {
    throw new AppError("There is no user roles", 404);
  }

  return { userRoles, totalRoles };
};

exports.getUserRoleService = async (id) => {
  const userRole = await UserRole.findById(id);

  if (!userRole) {
    throw new AppError("There is no user role with that ID", 404);
  }

  return userRole;
};

exports.createUserRoleService = async (body) => {
  const userRole = await UserRole.create(body);

  return userRole;
};

exports.updateSpecificUserRoleService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(`User not found for ID: ${userId}`, 404);
  }

  const points = user.point;
  let newRole = user.role;

  const roles = await UserRole.find();

  for (const role of roles) {
    if (points >= role.minPoint) {
      newRole = role;
    } else {
      throw new AppError("There is not enough point to update", 400);
      // break;
    }
  }

  if (user.role) {
    if (newRole._id.toString() !== user.role._id.toString()) {
      await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
    }
  } else {
    await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
  }

  return newRole;
};

exports.updateUserRoleService = async (id, body) => {
  const userRole = await UserRole.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!userRole) {
    throw new AppError("There is no userRole with that ID", 404);
  }

  return userRole;
};

exports.deleteUserRoleService = async (id) => {
  const userRole = await UserRole.findByIdAndDelete(id);

  if (!userRole) {
    throw new AppError("There is no userRole with that ID", 404);
  }
  return userRole;
};
