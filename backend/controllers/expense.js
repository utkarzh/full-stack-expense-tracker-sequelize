const Expense = require("../models/Expense");
const sequelize = require("../util/database");

exports.addExpenses = async (req, resp, next) => {
  let amount, desc, category, user;
  try {
    ({ amount, desc, category } = req.body);
    user = req.user;
  } catch (error) {
    resp.status(404).json({ message: "fields missing" });
  }
  const t = await sequelize.transaction();
  try {
    await user.createExpense(
      {
        amount: amount,
        desc: desc,
        category: category,
      },
      { transaction: t }
    );
    let userExpense_till_now = user.totalExpenses;
    await user.update(
      { totalExpenses: userExpense_till_now + Number(amount) },
      { transaction: t }
    );
    await t.commit();
    resp.status(200).json({ message: "data added!" });
  } catch (error) {
    await t.rollback();
    resp.status(404).json({ message: "data could not be added" });
  }
};

exports.getExpenses = async (req, resp, next) => {
  try {
    const expenses = await req.user.getExpenses();

    resp
      .status(200)
      .json({ expenses: expenses, isPremium: req.user.isPremium });
  } catch (error) {
    resp.status(404).json({ message: "no expenses found" });
  }
};

exports.deleteExpense = async (req, resp, next) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    const obsolete = await Expense.findOne(
      { where: { id: id } },
      { transaction: t }
    );
    const expenseNow = req.user.totalExpenses;
    req.user.update({ totalExpenses: expenseNow - obsolete.amount });

    await obsolete.destroy({ transaction: t });
    await t.commit();

    resp.status(200).json({ message: "expense was deleted!" });
  } catch (error) {
    await t.rollback();
    resp.status(404).json({ message: "unable to delete expense!" });
  }
};
