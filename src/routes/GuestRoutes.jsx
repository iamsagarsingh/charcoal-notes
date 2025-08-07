// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const GuestRoutes = ({ children }) => {
  const { state } = useAuth();

  return state.status ?  <Navigate to="/dashboard" replace /> : children;
};

export default GuestRoutes;
