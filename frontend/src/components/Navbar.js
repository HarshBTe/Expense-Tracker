import React from "react";
import axios from "axios";
import "../styles/Navbar.css";

const Navbar = ({ setIsAuthenticated }) => {
  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <nav className="navbar">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;