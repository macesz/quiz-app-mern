import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();

    // If user is not authenticated, redirect to sign-in page
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // If authenticated, render the children components
    return <Outlet />;
};

export default ProtectedRoute;
