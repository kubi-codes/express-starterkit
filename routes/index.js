var express = require("express");
var router = express.Router();
var private = require("./private");
var public = require("./public");

// middleware
var privateToken = require("../middlewares/privateToken");
var redisCache = require("../middlewares/redisCache");
var mainValidator = require("../middlewares/mainValidator");

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
private_get.map((result) =>
  router.get(
    result.path,
    privateToken,
    function (req, res, next) {
      mainValidator(req, res, next, result);
    },
    redisCache,
    result.controllers
  )
);
private_post.map((result) =>
  router.post(
    result.path,
    privateToken,
    function (req, res, next) {
      mainValidator(req, res, next, result);
    },
    redisCache,
    result.controllers
  )
);
private_patch.map((result) =>
  router.patch(
    result.path,
    privateToken,
    function (req, res, next) {
      mainValidator(req, res, next, result);
    },
    redisCache,
    result.controllers
  )
);
private_deletes.map((result) =>
  router.delete(
    result.path,
    privateToken,
    function (req, res, next) {
      mainValidator(req, res, next, result);
    },
    redisCache,
    result.controllers
  )
);

// render all public routes
public_get.map((result) =>
  router.get(
    result.path,
    function (req, res, next) {
      mainValidator(req, res, next, result);
    },
    redisCache,
    result.controllers
  )
);
public_post.map((result) =>
  router.post(
    result.path,
    function (req, res, next) {
      mainValidator(req, res, next, result);
    },
    function (req, res, next) {
      if (result?.middleware) {
        result?.middleware(req, res, next, result);
      } else {
        next();
      }
    },
    redisCache,
    result.controllers
  )
);
public_patch.map((result) =>
  router.patch(
    result.path,
    function (req, res, next) {
      mainValidator(req, res, next, result);
    },
    redisCache,
    result.controllers
  )
);
public_deletes.map((result) =>
  router.delete(
    result.path,
    function (req, res, next) {
      mainValidator(req, res, next, result);
    },
    redisCache,
    result.controllers
  )
);

module.exports = router;
