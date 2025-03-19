import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Register = ({ setShowRegister }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleRegister = async () => {
    try {
      await axios.post("/auth/register", form);
      alert("User registered successfully. Please login.");
      setShowRegister(false);
    } catch (error) {
      alert("Registration failed. Please try again.");
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
