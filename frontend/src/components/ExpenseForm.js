import React, { useState } from "react";
import axios from "axios";
import "../styles/ExpenseForm.css";
import { BACKEND_URL } from "../utils/utils";
import axiosInstance from "../utils/axiois";


const BASE_URL = BACKEND_URL;

const ExpenseForm = ({ fetchExpenses }) => {
  const [form, setForm] = useState({ amount: "", category: "", date: "", description: "" });
  const token = localStorage.getItem("token");

  const addExpense = async () => {
    try {
      const payload = {
        ...form,
        amount: parseFloat(form.amount) || 0, // Convert amount to number
      };

      await axiosInstance.post("/expenses", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense added successfully!");
      setForm({ amount: "", category: "", date: "", description: "" }); // Reset form
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert(error.response?.data?.message || "Failed to add expense. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <input
        className="form-input"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input
        className="form-input"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        type="date"
        className="form-input"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        className="form-input"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button className="form-button" onClick={addExpense}>Add Expense</button>
    </div>
  );
};

export default ExpenseForm;
