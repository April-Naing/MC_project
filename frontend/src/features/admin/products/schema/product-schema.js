import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required!"),
  description: z
    .string()
    .min(5, "Product description should have at least 5 characters"),
  originalPrice: z.coerce.number({ required_error: "Price is required" }),
  userRole: z.string().default("normal-user"),
  discountAmount: z.coerce.number().default(0),
  image: z.instanceof(File).nullish(),
});

export default productSchema;
