import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RequireAuth = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/login" />;
    return children;
};
