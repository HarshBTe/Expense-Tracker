import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { BACKEND_URL } from "../utils/utils";


const BASE_URL = BACKEND_URL;

const Dashboard = ({ setIsAuthenticated }) => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(BASE_URL+"/expenses", { withCredentials: true });
      setExpenses(res.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <ExpenseForm fetchExpenses={fetchExpenses} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
};

export default Dashboard;
