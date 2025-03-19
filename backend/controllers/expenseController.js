const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;
  const newExpense = new Expense({ userId: req.user.id, amount, category, date, description });
  await newExpense.save();
  res.status(201).send(newExpense);
};

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.send(expenses);
};

exports.deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.send('Expense deleted');
};