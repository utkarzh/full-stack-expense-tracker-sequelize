const Expense = require("../models/Expense");
exports.addExpenses = async (req, resp, next) => {
  let amount, desc, category,id;
  try {
    ({ amount, desc, category } = req.body);
    id=req.id;
  } catch (error) {
    resp.status(404).json({ message: "fields missing" });
  }

  try {
    await Expense.create({
      amount: amount,
      desc: desc,
      category: category,
      UserId:id
    });
    resp.status(200).json({ message: "data added!" });
  } catch (error) {
    resp.status(404).json({ message: "data could not be added" });
  }
};

exports.getExpenses = async (req, resp, next) => {

  try {
    const expenses = await Expense.findAll({where: {UserId:req.id}});
   
    resp.status(200).json({expenses});
  } catch (error) {
    resp.status(404).json({ message: "no expenses found" });
  }
};

exports.deleteExpense = async (req, resp, next) => {
  try {
    const id = req.params.id;
    const obsolete = await Expense.findOne({ where: { id: id } });
    console.log(obsolete);
    console.log('hey')
    await obsolete.destroy();
    console.log('ehy')
    resp.status(200).json({ message: "expense was deleted!" });
  } catch (error) {
    resp.status(404).json({ message: "unable to delete expense!" });
  }
};
