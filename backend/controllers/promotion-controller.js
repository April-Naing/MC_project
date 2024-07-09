const catchAsync = require("../utils/catch-async");
const {
  getAllPromotionsService,
  getPromotionService,
  createPromotionService,
  updatePromotionService,
  deletePromotionService,
} = require("../services/promotion-service");

exports.getAllPromotions = catchAsync(async (req, res, next) => {
  const { date, page, limit } = req.query;
  const { promotions, totalPromotions } = await getAllPromotionsService({
    date,
    page,
    limit,
  });

  res.status(200).json({
    message: "Getting the Promotions is successful.",
    data: {
      promotions,
      totalPromotions,
    },
  });
});

exports.getPromotion = catchAsync(async (req, res, next) => {
  const promotion = await getPromotionService(req.params.id);

  res.status(200).json({
    message: "Getting the Promotion  is successful.",
    data: promotion,
  });
});

exports.createPromotion = catchAsync(async (req, res, next) => {
  const promotion = await createPromotionService(req.body);

  res.status(200).json({
    message: "Creating Promotion is successful.",
    data: promotion,
  });
});

exports.updatePromotion = catchAsync(async (req, res, next) => {
  const promotion = await updatePromotionService(req.params.id, req.body);

  res.status(200).json({
    message: "Updating the Promotion is successful",
    data: {
      promotion,
    },
  });
});

exports.deletePromotion = catchAsync(async (req, res, next) => {
  await deletePromotionService(req.params.id);

  res.status(200).json({
    message: "Success!",
  });
});
