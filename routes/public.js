const version = "/v1";
const { uploadSingle } = require("../utils/images");

module.exports = [
  {
    path: `${version}/auth/login`,
    controllers: require("../controllers/Auth").login,
    validator: require("../controllers/Auth/validator").loginValidator,
    method: "post",
  },
  {
    path: `${version}/auth/register`,
    controllers: require("../controllers/Auth").register,
    validator: require("../controllers/Auth/validator").registerValidator,
    method: "post",
  },
  {
    path: `${version}/upload`,
    controllers: require("../controllers/Upload").upload,
    method: "post",
  },
];
