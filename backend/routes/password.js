const express = require("express");
const route = express.Router();
const passwordController = require("../controllers/password");

route.post("/forgotpassword", passwordController.forgotPassword);
route.get("/resetpassword/:id", passwordController.resetPassword);
route.post("/updatepassword/", passwordController.updatePassword);
module.exports = route;
