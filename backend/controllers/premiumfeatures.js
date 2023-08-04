const User = require("../models/User");
exports.getLeaderboard = async (req, resp, next) => {
  try {
    const leaderboardEntries = await User.findAll({
      attributes: ["name", "totalExpenses"],
      order: [["totalExpenses", "DESC"]],
    });
    resp.status(200).json({ leaderboardEntries });
  } catch (error) {
    resp.status(404).json(error);
  }
};
