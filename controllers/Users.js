const model = require("../models");
const setRedis = require("../utils/setRedis");

const getUser = async (req, res) => {
  model.users
    .findAll()
    .then((result) => {
      if (!result.length) throw new Error("User is empty");
      // Set data to redis for 10 seconds
      setRedis(req.originalUrl, JSON.stringify(result));
      res.json({
        status: "OK",
        messages: "",
        data: result,
      });
    })
    .catch((error) =>
      res.json({
        status: "ERROR",
        messages: error.message,
        data: null,
      })
    );
};

module.exports = { getUser };
