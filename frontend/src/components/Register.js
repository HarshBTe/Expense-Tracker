// Register.js
import React, { useState } from "react";
import "../styles/Login.css";
import { useExpenseContext } from "../context/ExpenseContext";

const Register = ({ setShowRegister }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { register } = useExpenseContext();

  const handleRegister = async () => {
    try {
      await register(form);
      alert("User registered successfully. Please login.");
      setShowRegister(false);  // Redirect to login
    } catch (error) {
      console.error("Registration failed", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Register</h2>
        <div className="login-form">
          <input
            className="login-input"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            className="login-input"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <input
            className="login-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="login-button" onClick={handleRegister}>Register</button>
          <button className="register-button" onClick={() => setShowRegister(false)}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
