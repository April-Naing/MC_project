const Promotion = require("../models/promotion-model");
const APIFeatures = require("../utils/api-features");
const AppError = require("../utils/app-error");

exports.getAllPromotionsService = async ({ date, page, limit }) => {
  const query = date ? { endDate: { $gte: date } } : {};
  const qry = page && limit ? { page, limit } : {};
  const feature = new APIFeatures(Promotion.find(query), qry).paginate();

  const promotions = await feature.query;

  const totalPromotions = await Promotion.countDocuments();
  if (!promotions) {
    throw new AppError("There is no Promotion yet now.", 404);
  }

  return { promotions, totalPromotions };
};

exports.getPromotionService = async (id) => {
  const promotion = await Promotion.findById(id);

  if (!promotion) {
    throw new AppError("There is no promotion with that ID", 404);
  }

  return promotion;
};

exports.createPromotionService = async (body) => {
  const promotion = await Promotion.create(body);

  return promotion;
};

exports.updatePromotionService = async (id, body) => {
  const promotion = await Promotion.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!promotion) {
    throw new AppError("There is no promotion with that ID", 404);
  }

  return promotion;
};

exports.deletePromotionService = async (id) => {
  const promotion = await Promotion.findByIdAndDelete(id);

  if (!promotion) {
    throw new AppError("There is no promotion with that ID", 404);
  }
  return promotion;
};
