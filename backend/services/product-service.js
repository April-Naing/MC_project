const Product = require("../models/product-model");
const AppError = require("../utils/app-error");
const APIFeatures = require("../utils/api-features");

exports.getAllProductsService = async (query) => {
  let mongooseQuery = Product.find();
  mongooseQuery.populate("discounts.roleId");

  const feature = new APIFeatures(mongooseQuery, query).paginate();
  const products = await feature.query;
  const totalProducts = await Product.countDocuments();

  if (!products) {
    throw new AppError("There is no products", 404);
  }

  return { products, totalProducts };
};

exports.getProductWithDiscountService = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError("There is no product with that ID", 404);
  }

  return product;
};

exports.getProductService = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError("There is no product with that ID", 404);
  }

  return product;
};

exports.createProductService = async (body) => {
  const product = await Product.create(body);

  return product;
};

exports.updateProductService = async (id, body) => {
  const product = await Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new AppError("There is no Product with that ID", 404);
  }

  return product;
};

exports.deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new AppError("There is no product with that ID", 404);
  }
  return product;
};
