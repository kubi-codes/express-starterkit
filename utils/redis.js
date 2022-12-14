require("dotenv").config();

const Redis = require("ioredis");
let redis;

if (process.env.USE_REDIS) {
  redis = new Redis();
}

module.exports = redis;
