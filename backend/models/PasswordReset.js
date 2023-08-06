const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const PasswordReset = sequelize.define("PasswordReset", {
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  isActive: {
    primaryKey: true,
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});
module.exports = PasswordReset;
