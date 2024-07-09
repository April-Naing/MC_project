import { z } from "zod";

const roleSchema = z.object({
  role: z.string().min(1, "role is required!"),
  minPoint: z.number({ required_error: "Please enter number" }).default(0),
  pointMultiplier: z.number().default(1),
});

export default roleSchema;
