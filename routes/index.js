var express = require("express");
var router = express.Router();
var private = require("./private");
var public = require("./public");

// middleware
var privateToken = require("../middlewares/privateToken");
var redisCache = require("../middlewares/redisCache");

// Loop all private routes
var private_get = private.filter((res) => res.method === "get");
var private_post = private.filter((res) => res.method === "post");
var private_patch = private.filter((res) => res.method === "patch");
var private_deletes = private.filter((res) => res.method === "delete");

// Loop all public routes
var public_get = public.filter((res) => res.method === "get");
var public_post = public.filter((res) => res.method === "post");
var public_patch = public.filter((res) => res.method === "patch");
var public_deletes = public.filter((res) => res.method === "delete");

// render all private routes
private_get.map((res) =>
  router.get(res.path, privateToken, redisCache, res.controllers)
);
private_post.map((res) =>
  router.post(res.path, privateToken, redisCache, res.controllers)
);
private_patch.map((res) =>
  router.patch(res.path, privateToken, redisCache, res.controllers)
);
private_deletes.map((res) =>
  router.delete(res.path, privateToken, redisCache, res.controllers)
);

// render all public routes
public_get.map((res) => router.get(res.path, res.controllers));
public_post.map((res) => router.post(res.path, res.controllers));
public_patch.map((res) => router.patch(res.path, res.controllers));
public_deletes.map((res) => router.delete(res.path, res.controllers));

module.exports = router;
