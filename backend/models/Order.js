const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Order = sequelize.define("order", {
  orderId: {
    primaryKey: true,
    type: Sequelize.STRING,
    unique: true,
  },
  paymentId: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
});
module.exports = Order;
