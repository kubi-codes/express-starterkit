require("dotenv").config();
const redis = require("./redis");

function setRedis(url, data, ms) {
  if (
    process.env.REDIS_HOST &&
    process.env.REDIS_PORT &&
    process.env.REDIS_PASS
  ) {
    return redis.set(url, data, "EX", ms || 100);
  } else {
    return null;
  }
}

module.exports = setRedis;
