const { z } = require("zod");

const couponSchema = z.object({
  body: z.object({
    code: z.string().min(4, "Code must have at least 4 characters."),
    startDate: z.string().date(),
    endDate: z.string().date(),
    discountPrice: z.number(),
  }),
});

module.exports = couponSchema;
