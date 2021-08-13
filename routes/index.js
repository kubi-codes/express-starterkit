var express = require("express");
var router = express.Router();
var routes = require("./routes");

// Loop all routes get
var get = routes.filter((res) => res?.method === "get");
var post = routes.filter((res) => res?.method === "post");
var patch = routes.filter((res) => res?.method === "patch");
var deletes = routes.filter((res) => res?.method === "delete");

get.map((res) => router.get(res?.path, res?.controllers));
post.map((res) => router.post(res?.path, res?.controllers));
patch.map((res) => router.patch(res?.path, res?.controllers));
deletes.map((res) => router.delete(res?.path, res?.controllers));

module.exports = router;
