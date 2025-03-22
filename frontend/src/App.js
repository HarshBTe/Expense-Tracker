import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { ExpenseProvider, useExpenseContext } from "./context/ExpenseContext";

function AppContent() {
  const { isAuthenticated } = useExpenseContext();
  const [showRegister, setShowRegister] = React.useState(false);

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