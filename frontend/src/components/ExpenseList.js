import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ExpenseList.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";



const ExpenseList = ({ expenses, setExpenses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const itemsPerPage = 3;

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://expense-backend-07ul.onrender.com/expenses", { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
      alert("Failed to fetch expenses");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://expense-backend-07ul.onrender.com/expenses/${id}`, { withCredentials: true });
      setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Error deleting expense", error);
      alert("Failed to delete expense");
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.category.localeCompare(b.category);
    } else {
      return b.category.localeCompare(a.category);
    }
  });

  const totalPages = Math.ceil(sortedExpenses.length / itemsPerPage);
  const paginatedExpenses = sortedExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const categoryData = expenses.reduce((acc, exp) => {
    const found = acc.find((item) => item.category === exp.category);
    if (found) {
      found.amount += exp.amount;
    } else {
      acc.push({ category: exp.category, amount: exp.amount });
    }
    return acc;
  }, []);

  return (
    <div className="expense-list-container">
      <h2 className="expense-header">Expenses</h2>
      <div className="sort-buttons">
        <button className="sort-button" onClick={() => setSortOrder("asc")}>Sort A-Z</button>
        <button className="sort-button" onClick={() => setSortOrder("desc")}>Sort Z-A</button>
      </div>
      {paginatedExpenses.map((exp) => (
        <div className="expense-item" key={exp._id}>
          {exp.category}: ${exp.amount} on {new Date(exp.date).toLocaleDateString()}
          <button className="delete-button" onClick={() => handleDelete(exp._id)}>Delete</button>
        </div>
      ))}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
      <h3 className="expense-header">Category Wise Spending</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseList;
