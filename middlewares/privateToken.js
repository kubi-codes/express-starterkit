require("dotenv").config();
const { APP_SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (typeof header !== "undefined") {
      jwt.verify(header.slice(6).trim(), APP_SECRET_KEY, function (err) {
        if (err) {
          throw new Error("Api key not valid");
        } else {
          next();
        }
      });
    } else {
      throw new Error("Api key cannot be empty");
    }
  } catch (err) {
    res.status(401).json({
      status: "ERROR",
      messages: err.message,
      data: null,
    });
  }
};

module.exports = authMiddleware;
