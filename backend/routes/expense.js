const express = require("express");
const jwtCheck = require("../middlewares/jwtCheck");
const route = express.Router();
const expense = require("../controllers/expense");
route.post("/expenses", jwtCheck.jwtCheck, expense.addExpenses);
route.get("/expenses", jwtCheck.jwtCheck, expense.getExpenses);
route.delete("/expenses/:id", jwtCheck.jwtCheck, expense.deleteExpense);
route.get("/download", jwtCheck.jwtCheckPremium, expense.downloadExpense);
module.exports = route;
