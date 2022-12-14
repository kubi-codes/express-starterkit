const version = "/v1";
const { uploadSingle } = require("../utils/images");

module.exports = [
  {
    path: `${version}/auth/login`,
    controllers: require("../controllers/Auth").login,
    validator: require("../controllers/Auth/validator").loginValidator, // global validator
    method: "post",
  },
  {
    path: `${version}/auth/register`,
    controllers: require("../controllers/Auth").register,
    method: "post",
  },
  {
    path: `${version}/auth/logout/:id`,
    controllers: require("../controllers/Auth").logout,
    method: "get",
  },
];
