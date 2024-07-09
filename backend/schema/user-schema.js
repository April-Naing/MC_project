const { z } = require("zod");

const userSchema = z.object({
  body: z
    .object({
      name: z.string(),
      email: z.string().email("Invalid email."),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(15, "Password must be at most 15 characters."),
      passwordConfirm: z.string(),
      // role: z.string().default("normal-user"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Password and password confrim must be the same.",
      path: ["passwordConfirm"],
    }),
});

module.exports = userSchema;
