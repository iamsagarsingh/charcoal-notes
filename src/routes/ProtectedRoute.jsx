// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();
  return state.status ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
