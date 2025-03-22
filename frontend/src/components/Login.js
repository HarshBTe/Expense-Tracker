import React, { useState } from "react";
import "../styles/Login.css";
import { useExpenseContext } from "../context/ExpenseContext";

const Login = ({ setShowRegister }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useExpenseContext();

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission
    try {
      await login(form);
    } catch (error) {
      console.error("Login failed", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Invalid credentials. Please try again.");
      } else if (error.message) {
        alert(error.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            className="login-input"
            placeholder="Email"
            value={form.email}
            autoComplete="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={form.password}
            autoComplete="current-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="register-button" onClick={() => setShowRegister(true)}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
