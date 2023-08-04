const Expense = require("../models/Expense");


exports.addExpenses = async (req, resp, next) => {
  let amount, desc, category,user;
  try {
    ({ amount, desc, category } = req.body);
     user=req.user;
  } catch (error) {
    resp.status(404).json({ message: "fields missing" });
  }

  try {
    await user.createExpense({
      amount: amount,
      desc: desc,
      category: category,
    
    });
    let userExpense_till_now=user.totalExpenses
    await user.update({totalExpenses:userExpense_till_now+Number(amount)})
    resp.status(200).json({ message: "data added!" });
  } catch (error) {
    resp.status(404).json({ message: "data could not be added" });
  }
};


exports.getExpenses = async (req, resp, next) => {

  try {
    const expenses = await req.user.getExpenses();
   
    resp.status(200).json({expenses:expenses,isPremium:req.user.isPremium});
  } catch (error) {
    resp.status(404).json({ message: "no expenses found" });
  }
};

exports.deleteExpense = async (req, resp, next) => {
  try {
    const id = req.params.id;
    const obsolete = await Expense.findOne({ where: { id: id } });
   
  
    await obsolete.destroy();
 
    resp.status(200).json({ message: "expense was deleted!" });
  } catch (error) {
    resp.status(404).json({ message: "unable to delete expense!" });
  }
};
