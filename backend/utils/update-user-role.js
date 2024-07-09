const UserRole = require("../models/user-role-model");
const User = require("../models/user-model");

exports.updateUserRole = async function (userId) {
  const user = await User.findById(userId);

  const points = user.point;
  let newRole = user.role;

  const roles = await UserRole.find();

  console.log("newrole", newRole);
  for (const role of roles) {
    if (role.role !== "admin") {
      if (points >= role.minPoint) {
        newRole = role;
      }
    }
  }
  return newRole;
};
