const express = require("express");
const route = express.Router();
const User = require("../controllers/authorisation");
route.post("/signup", User.signUp);
route.post("/login", User.logIn);

module.exports = route;
