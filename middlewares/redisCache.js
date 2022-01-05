require("dotenv").config();
const redis = require("../utils/redis");

const cache = (req, res, next) => {
  if (process.env.REDIS) {
    redis.get(req.originalUrl, (error, result) => {
      if (error) throw error;
      if (result !== null) {
        return res.json({
          status: "OK",
          messages: "Cached",
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
