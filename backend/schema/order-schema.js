const { z } = require("zod");

const orderSchema = z.object({
  body: z.object({
    orderItems: z.array(z.string()),
    user: z.string(),
    totalAmount: z.number(),
  }),
});

module.exports = orderSchema;
