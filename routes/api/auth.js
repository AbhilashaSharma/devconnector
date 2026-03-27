const express = require("express");

const routes = express.Router();

//@access Public
//@desc   Test Route
//@route  GET /api/auth
routes.get("/", (req, res) => res.send("Auth route"));
module.exports = routes;
