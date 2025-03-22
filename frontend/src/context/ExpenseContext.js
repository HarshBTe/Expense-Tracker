import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiois";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchExpenses = async () => {
    console.log("Fetching expenses...");
    try {
      const res = await axiosInstance.get("/expenses", { withCredentials: true });
      console.log("Expenses fetched successfully:", res.data);
      setExpenses(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
      }
      console.error("Failed to fetch expenses:", error);
    }
  };

  const addExpense = async (expenseData) => {
    console.log("Adding expense...");
    try {
      const res = await axiosInstance.post("/expenses", expenseData, { withCredentials: true });
      console.log("Expense added:", res.data);
      fetchExpenses(); // Refresh expenses list after adding
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  const deleteExpense = async (id) => {
    console.log("Deleting expense...");
    try {
      await axiosInstance.delete(`/expenses/${id}`, { withCredentials: true });
      console.log("Expense deleted");
      fetchExpenses(); // Refresh expenses list after deleting
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };




  const checkAuth = async () => {
    console.log("Checking authentication...");
    try {
      const res = await axiosInstance.get("/auth/check", { withCredentials: true });
      console.log("Auth check successful:", res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response && error.response.status !== 401) {
        console.error("Auth check failed:", error);
      }
      setIsAuthenticated(false);
    }
  };
  

  const login = async (form) => {
    console.log("Logging in...");
    try {
      await axiosInstance.post("/auth/login", form, { withCredentials: true });
      console.log("Login successful");
      setIsAuthenticated(true);  // This triggers useEffect to fetch expenses
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (form) => {
    console.log("Registering user...");
    try {
      await axiosInstance.post("/auth/register", form);
      console.log("User registered successfully");
      alert("User registered successfully. Please login.");
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      console.log("Logout successful");
      setIsAuthenticated(false);
      setExpenses([]);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkAuth();
    };
    init();
  }, []);

  useEffect(() => {
    console.log("isAuthenticated changed:", isAuthenticated);
    if (isAuthenticated) {
      fetchExpenses();
    }
  }, [isAuthenticated]);

  return (
    <ExpenseContext.Provider value={{ expenses, fetchExpenses, addExpense, deleteExpense, login, register, logout, isAuthenticated, setIsAuthenticated }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);