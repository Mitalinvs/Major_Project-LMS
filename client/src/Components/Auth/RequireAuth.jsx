import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
    const { isLoggedIn,data } = useSelector((state) => state.auth);

    return isLoggedIn && allowedRoles.find((myRole) => myRole === data.userrole) ? (
        <Outlet/>
    ) : isLoggedIn ? ( <Navigate to="/denied"/>) : (<Navigate to="/login" />)
}

export default RequireAuth;