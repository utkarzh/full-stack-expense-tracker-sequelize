const Sequelize = require("sequelize");
const sequelize = new Sequelize("sharpener_practice", "root", "LUMIA435", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
