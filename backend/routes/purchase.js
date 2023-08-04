const express = require("express");
const route = express.Router();
const middleware = require("../middlewares/token");
const purchaseController = require("../controllers/purchase");
route.post("/buypremium", middleware.jwtCheck, purchaseController.buyPremium);
route.post(
  "/updateorderstatus",
  middleware.jwtCheck,
  purchaseController.verifyPremium
);
module.exports = route;
