const express = require("express");
const app = express();
const cors=require('cors');
const sequelize = require("./util/database");
const User=require('./models/User');
const Expense=require('./models/Expense');
const expenseRoutes=require('./routes/expense');
const authorisationRoutes = require("./routes/authorisation");
User.hasMany(Expense);
Expense.belongsTo(User);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(authorisationRoutes);
app.use(expenseRoutes)
sequelize.sync().then((_) => {
  app.listen(3000);
});
