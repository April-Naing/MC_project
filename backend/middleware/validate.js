const { z } = require("zod");

const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      schema.parse({ body: req[source] });
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: err.errors,
        });
      }
      next(err);
    }
  };

module.exports = validate;
