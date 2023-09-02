const version = "/v1";

module.exports = [
  {
    path: `${version}/auth/logout`,
    controllers: require("../controllers/Auth").logout,
    method: "get",
  },
  {
    path: `${version}/users`,
    controllers: require("../controllers/Users").getUser,
    method: "get",
    cache: false,
  },
];
