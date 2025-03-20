const express = require('express');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', addExpense);
router.get('/', getExpenses);
router.delete('/:id', authMiddleware, deleteExpense);




module.exports = router;
