require("dotenv").config();
const Redis = require("ioredis");

let redis;

if (
  process.env.REDIS_HOST &&
  process.env.REDIS_PORT &&
  process.env.REDIS_PASS
) {
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
  });
}

module.exports = redis;
