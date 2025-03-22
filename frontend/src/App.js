import React, { useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { ExpenseProvider, useExpenseContext } from "./context/ExpenseContext";

function AppContent() {
  const { isAuthenticated, checkAuth } = useExpenseContext();
  const [showRegister, setShowRegister] = React.useState(false);

  useEffect(() => {
    checkAuth();  // Ensure we check auth when the app loads
  }, []);

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
