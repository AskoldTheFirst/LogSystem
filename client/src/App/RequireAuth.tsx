import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppState } from "../Biz/Types/AppState";
import { useContext } from "react";
import { Ctx } from "./App";

export default function RequireAuth() {
    const { user } = useContext<AppState>(Ctx);
    const location = useLocation();

    if (!user)
    {
        return <Navigate to='/login' state={{from: location}} />
    }

    return <Outlet />
}