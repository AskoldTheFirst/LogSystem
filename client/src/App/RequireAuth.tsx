import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../globalContext";

export default function RequireAuth() {
    const { user } = useContext(GlobalContext)
    const location = useLocation();

    if (!user)
    {
        return <Navigate to='/login' state={{from: location}} />
    }

    return <Outlet />
}