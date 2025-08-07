import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastProvider } from "./notifications/ToastProvider";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen bg-sky-50">
      <ToastProvider>
        <Navbar />
        <Outlet />
      </ToastProvider>
    </div>
  );
}

export default App;
