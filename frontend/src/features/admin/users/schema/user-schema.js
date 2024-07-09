import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "name is required!"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passwordConfirm: z.string(),
  role: z.string().nullable(),
  point: z.number(),
});

export default userSchema;
