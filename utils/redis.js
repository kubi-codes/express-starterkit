require("dotenv").config();

const Redis = require("ioredis");
let redis;

if (process.env.REDIS) {
  redis = new Redis();
}

module.exports = redis;
