const express = require("express");
const middleware = require("../middlewares/token");
const route = express.Router();
const expense = require("../controllers/expense");
route.post("/expenses", middleware.jwtCheck, expense.addExpenses);
route.get("/expenses", middleware.jwtCheck, expense.getExpenses);
route.delete("/expenses/:id", middleware.jwtCheck, expense.deleteExpense);
module.exports = route;
