const { z } = require("zod");

const orderItemSchema = z.object({
  body: z.object({
    product: z.string(),
    quantity: z.number().min(1, "Order item must have at least one quantity"),
    price: z.number(),
  }),
});

module.exports = orderItemSchema;
