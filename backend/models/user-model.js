const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordConfirm: {
    type: String,
  },
  role: {
    type: mongoose.Schema.ObjectId,
    ref: "UserRole",
  },
  point: {
    type: Number,
    default: 0,
  },
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "role",
    select: "role pointMultiplier minPoint",
  });
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  userEnteredPassword,
  hashedPassword
) {
  return bcrypt.compare(userEnteredPassword, hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
