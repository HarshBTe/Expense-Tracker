import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";



const Login = ({ setIsAuthenticated, setShowRegister }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      console.log("Attempting login with", form);
      const response = await axios.post("https://expense-backend-07ul.onrender.com/auth/login", form, { withCredentials: true });
      console.log("Login successful", response);
      setIsAuthenticated(true);
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
        <div className="login-form">
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
          <button className="login-button" onClick={handleLogin}>Login</button>
          <button className="register-button" onClick={() => setShowRegister(true)}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
