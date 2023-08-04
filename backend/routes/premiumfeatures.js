const express = require("express");
const route = express.Router();
const middleware = require("../middlewares/token");
const premiumControllers = require("../controllers/premiumfeatures");
route.get(
  "/leaderboard",
  middleware.jwtCheckPremium,
  premiumControllers.getLeaderboard
);

module.exports = route;
