const { Validator } = require("node-input-validator");

const cache = (req, res, next, result) => {
  if (result.validator) {
    const rules = new Validator(req.body, result.validator);

    rules.check().then((matched) => {
      if (!matched) {
        res.status(422).json({
          status: "ERROR",
          messages: rules.errors,
          data: null,
        });
      } else {
        return next();
      }
    });
  } else {
    return next();
  }
};

module.exports = cache;
