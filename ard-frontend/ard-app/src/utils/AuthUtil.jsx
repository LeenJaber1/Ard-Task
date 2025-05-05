import { Navigate } from "react-router-dom";
export const RequireAuth = ({ children }) => {
    const isLoggedIn = document.cookie.includes("access_token");
  
    return isLoggedIn ? children : <Navigate to="/" replace />;
};