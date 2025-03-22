import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { ExpenseProvider, useExpenseContext } from "./context/ExpenseContext";

function AppContent() {
  const { isAuthenticated, checkAuth } = useExpenseContext();
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setLoading(false);
    };
    verifyAuth();
  }, [checkAuth]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard />
      ) : showRegister ? (
        <Register setShowRegister={setShowRegister} />
      ) : (
        <Login setShowRegister={setShowRegister} />
      )}
    </div>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <AppContent />
    </ExpenseProvider>
  );
}

export default App;
