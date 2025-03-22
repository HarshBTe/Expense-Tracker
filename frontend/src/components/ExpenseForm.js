import React, { useState } from "react";
import "../styles/ExpenseForm.css";
import { useExpenseContext } from "../context/ExpenseContext";

const ExpenseForm = () => {
  const { addExpense } = useExpenseContext();
  const [form, setForm] = useState({ amount: "", category: "", date: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date || !form.description) {
      alert("All fields are required.");
      return;
    }
    try {
      await addExpense({
        ...form,
        amount: parseFloat(form.amount) || 0,
      });
      setForm({ amount: "", category: "", date: "", description: "" });
    } catch (error) {
      console.error("Failed to add expense", error);
      alert("Failed to add expense. Please try again.");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="form-input"
        placeholder="Amount"
        aria-label="Amount"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
      />
      <input
        className="form-input"
        placeholder="Category"
        aria-label="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
      />
      <input
        type="date"
        className="form-input"
        aria-label="Date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <input
        className="form-input"
        placeholder="Description"
        aria-label="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <button className="form-button" type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
