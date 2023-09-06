const express = require("express");
const route = express.Router();
const jwtCheck = require("../middlewares/jwtCheck");
const purchaseController = require("../controllers/purchase");
route.post("/buypremium", jwtCheck.jwtCheck, purchaseController.buyPremium);
route.post(
  "/updateorderstatus",
  jwtCheck.jwtCheck,
  purchaseController.verifyPremium
);
module.exports = route;
