const express = require("express");
const route = express.Router();
const jwtCheck = require("../middlewares/jwtCheck");
const premiumControllers = require("../controllers/premiumfeatures");
route.get(
  "/leaderboard",
  jwtCheck.jwtCheckPremium,
  premiumControllers.getLeaderboard
);

module.exports = route;
