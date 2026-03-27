const express = require("express");

const routes = express.Router();

//@access Public
//@desc   Test Route
//@route  GET /api/profile
routes.get("/", (req, res) => res.send("Profile route"));
module.exports = routes;
