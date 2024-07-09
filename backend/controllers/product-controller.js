const catchAsync = require("../utils/catch-async");
const User = require("../models/user-model");
const {
  getAllProductsService,
  getProductService,
  createProductService,
  getProductWithDiscountService,
  getProductsByRoleService,
  updateProductService,
  deleteProductService,
} = require("../services/product-service");
const sharp = require("sharp");
const AppError = require("../utils/app-error");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const query = req.query;
  const { products, totalProducts } = await getAllProductsService(query);

  res.status(200).json({
    message: "Success",
    data: {
      products,
      totalProducts,
    },
  });
});

exports.getProductWithDiscount = catchAsync(async (req, res, next) => {
  const { role } = req.query;
  const product = await getProductWithDiscountService(req.params.id);

  const discount = product.find((d) => d.roleId._id === role);
  const finalPrice = discount
    ? product.originalPrice * (1 - discount.discountPercentage / 100)
    : product.originalPrice;

  res.status(200).json({
    message: "Getting the exact product is successful",
    data: {
      product,
      finalPrice,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await getProductService(req.params.id);

  res.status(200).json({
    message: "Getting the exact product is successful",
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  console.log("req body", req.body);

  const { name, description, originalPrice, discounts } = req.body;

  const image = req.file;
  console.log("This is image");
  console.log(image);
  if (!image) {
    return next(new AppError("Image is required", 400));
  }

  const imgFileName = `${Date.now()}-${image?.originalname}`;
  await sharp(image?.buffer)
    .resize(2000, 1333)
    .toFile(`public/img/products/${imgFileName}`);

  const productData = {
    name,
    description,
    originalPrice,
    discounts,
    image: imgFileName,
  };

  const newProduct = await createProductService(productData);

  console.log(newProduct);
  res.status(200).json({
    message: "Success creating product",
    data: {
      newProduct,
    },
  });
});

exports.getProductsByRole = catchAsync(async (req, res, next) => {
  const discountedProducts = await getProductsByRoleService(req.user.role);

  res.status(200).json({
    message: "Discounted products retrieved successfully",
    data: {
      discountedProducts,
    },
  });
});

exports.updateProductImage = catchAsync(async (req, res, next) => {
  if (req.file) {
    const image = req.file;
    console.log("This is image");
    console.log(image);
    const imgFileName = `${Date.now()}-${image?.originalname}`;
    await sharp(image?.buffer)
      .resize(2000, 1333)
      .toFile(`public/img/products/${imgFileName}`);

    req.body.image = imgFileName;
  }

  next();
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await updateProductService(req.params.id, req.body);

  res.status(200).json({
    message: "Updating the product is successful.",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await deleteProductService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});
