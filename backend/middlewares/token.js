const jwt = require("jsonwebtoken");
const Users = require("../models/User");
exports.jwtCheck = async (req, resp, next) => {
  const token = req.header("Authorization");

 
  try {
   if (!token) {
      throw new Error({message:"new error"});
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
