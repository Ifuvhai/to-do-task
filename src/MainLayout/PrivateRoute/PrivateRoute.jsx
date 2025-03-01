import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{from:location}} replace />;
    }

    return children;
};

export default PrivateRoute;
