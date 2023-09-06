const Expense = require("../models/Expense");
const sequelize = require("../util/database");
const AWS = require("aws-sdk");

exports.downloadExpense = async (req, resp, next) => {
  try {
    user = req.user;
    const userExpenses_raw = await user.getExpenses();
    const userExpenses = JSON.stringify(userExpenses_raw);
    const fileName = `expenses_${user.name}.txt`; // Use an underscore for better readability

    const s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
    });

    const params = {
      Bucket: "expense-tracker-app123",
      Key: fileName,
      Body: userExpenses,
      ACL: "public-read",
    };

    try {
      const result = await s3bucket.upload(params).promise();
      console.log("File uploaded successfully:", result.Location);
      resp.status(200).json(result.Location);
    } catch (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      resp.status(500).json({ error: "Error uploading file" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    resp.status(500).json({ error: "Internal server error" });
  }
};

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
    const pagenumber = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;

    const offset = (pagenumber - 1) * perPage;

    const expenses = await req.user.getExpenses({
      offset: offset,
      limit: perPage,
    });

    resp.status(200).json({
      expenses: expenses,
      isPremium: req.user.isPremium,
    });
  } catch (error) {
    resp.status(500).json({ message: "An error occurred" });
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
