import React from "react";
import "../styles/Navbar.css";
import { useExpenseContext } from "../context/ExpenseContext";

const Navbar = () => {
  const { logout } = useExpenseContext();

  return (
    <nav className="navbar">
      <button className="logout-button" onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;