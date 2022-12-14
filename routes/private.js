const version = "/v1";

module.exports = [
  {
    path: `${version}/users`,
    controllers: require("../controllers/Users").getUser,
    method: "get",
    cache: false,
  },
];
