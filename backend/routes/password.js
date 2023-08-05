const express = require("express");
const route = express.Router();
const passwordController = require("../controllers/password");

route.post("/forgotpassword", passwordController.forgotPassword);
module.exports = route;
