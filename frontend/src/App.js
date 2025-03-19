import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : showRegister ? (
        <Register setShowRegister={setShowRegister} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} setShowRegister={setShowRegister} />
      )}
    </div>
  );
}

export default App;
