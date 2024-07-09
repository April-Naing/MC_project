const User = require("../models/user-model");
const userSchema = require("../schema/user-schema");
const AppError = require("../utils/app-error");
const catchAsync = require("../utils/catch-async");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { updateUserService } = require("../services/user-service");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendCreatedToken = async (user, statusCode, res) => {
  const token = createToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    message: "Success create token.",
    token,
    data: {
      user,
    },
  });
};

exports.signIn = catchAsync(async (req, res, next) => {
  const data = userSchema.safeParse({ body: req.body });

  if (!data.success) {
    return res.status(404).json({ error: data.error.errors });
  }

  const createdUser = await User.create(data.data.body);

  sendCreatedToken(createdUser, 201, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("You must provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Invaild user."));
  }

  const correct = await user.correctPassword(password, user.password);

  if (!correct) {
    return next(new AppError("Invalid password.", 401));
  }

  sendCreatedToken(user, 201, res);
});

exports.logOut = (req, res) => {
  res.cookie("jwt", "logged out ", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "Success loged out." });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in!Please log in."));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exist!", 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
