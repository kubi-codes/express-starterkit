const version = "/v1";

module.exports = [
  {
    path: `${version}/auth/login`,
    controllers: require("../controllers/Auth").login,
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