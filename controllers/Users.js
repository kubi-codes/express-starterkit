const model = require("../models");

const getUser = async (req, res) => {
  try {
    const users = await model.users.findAll();
    if (users.length !== 0) {
      res.json({
        status: "OK",
        messages: "",
        data: users,
      });
    } else {
      throw new Error("User is not registered");
    }
  } catch (error) {
    res.json({
      status: "ERROR",
      messages: error.message,
      data: {},
    });
  }
};

module.exports = { getUser };
