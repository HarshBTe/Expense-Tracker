import React, { useEffect } from "react";
import Navbar from "./Navbar";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { useExpenseContext } from "../context/ExpenseContext";

const Dashboard = () => {
  const { fetchExpenses } = useExpenseContext();

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <Navbar />
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};

export default Dashboard;
