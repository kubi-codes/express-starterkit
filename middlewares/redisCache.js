require("dotenv").config();
const redis = require("../utils/redis");

const cache = (req, res, next) => {
  if (
    process.env.REDIS_HOST &&
    process.env.REDIS_PORT &&
    process.env.REDIS_PASS
  ) {
    redis.get(req.originalUrl, (error, result) => {
      if (error) throw error;
      if (result !== null) {
        return res.json({
          status: "OK",
          messages: "Cached",
          cache: true,
          data: JSON.parse(result),
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
