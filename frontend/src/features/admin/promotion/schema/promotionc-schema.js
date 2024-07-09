import { z } from "zod";

const promotionSchema = z.object({
  name: z.string().min(5, "Promotion name must have at least 5 characters."),
  description: z
    .string()
    .min(8, "Promotion description must have at least 8 characters.")
    .max(50, "Promotion description must have at most 50 characters."),
  amount: z.number().min(1, "Discount amount is required"),
  code: z.string().min(4, "Code must have at least 4 characters."),
  startDate: z.string().date(),
  // startDate: z.string().datetime({ offset: true }),
  endDate: z.string().date(),
});

export default promotionSchema;
