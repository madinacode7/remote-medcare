
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRole: "patient" | "doctor" | "admin";
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const { currentUser, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (currentUser?.role !== allowedRole) {
    // Redirect to their appropriate dashboard
    if (currentUser?.role === "patient") {
      return <Navigate to="/patient" replace />;
    } else if (currentUser?.role === "doctor") {
      return <Navigate to="/doctor" replace />;
    } else if (currentUser?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;
