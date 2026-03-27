const express = require("express");

const routes = express.Router();

//@access Public
//@desc   Test Route
//@route  GET /api/post
routes.get("/", (req, res) => res.send("Post route"));
module.exports = routes;
