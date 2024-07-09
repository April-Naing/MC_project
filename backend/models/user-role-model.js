const { default: mongoose } = require("mongoose");

const userRoleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: "normal-user",
    unique: true,
  },
  minPoint: {
    type: Number,
    required: true,
    default: 0,
  },
  pointMultiplier: {
    type: Number,
    required: true,
    default: 1,
  },
});

const UserRole = mongoose.model("UserRole", userRoleSchema);

module.exports = UserRole;
