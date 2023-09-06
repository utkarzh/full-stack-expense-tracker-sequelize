const jwt = require("jsonwebtoken");
const Users = require("../models/User");
exports.jwtCheck = async (req, resp, next) => {
  const token = req.header("Authorization");

  try {
    if (!token) {
      throw new Error({ message: "new error" });
    }
    const decodedId = await jwt.verify(token, process.env.JWTKEY);

    const admi = await Users.findOne({ where: { id: decodedId.userId } });

    if (admi) {
      req.user = admi;
      next();
    }
  } catch (error) {
    resp.status(404).json({ message: "real hacker spotted!" });
  }
};

exports.jwtCheckPremium = async (req, resp, next) => {
  const token = req.header("Authorization");
  console.log("in prem middleware");

  try {
    let admi;
    if (!token) {
      throw new Error({ message: "new error" });
    }
    const decodedId = await jwt.verify(token, process.env.JWTKEY);
    console.log(decodedId);

    if (decodedId.isPremium) {
      admi = await Users.findOne({ where: { id: decodedId.userId } });
      console.log("ha hai ye premium user");
      req.user = admi;
      next();
    }
  } catch (error) {
    console.log("ye nahi hai prem user");
    resp.status(404).json({ message: "You are not a premium user!" });
  }
};
