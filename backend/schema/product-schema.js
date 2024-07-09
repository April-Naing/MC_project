const { z } = require("zod");
const { description } = require("./user-schema");

const productSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Product name must have at least 3 characters."),
    originalPrice: z.number(),
    description: z
      .string()
      .min(5, "Product description must have at least 5 characters."),
    image: z.any().refine((files) => files?.length == 1, "Image is required."),
    userRole: z.string().default("normal-user"),
    discountAmount: z.number().default(0),
  }),
});

module.exports = productSchema;
