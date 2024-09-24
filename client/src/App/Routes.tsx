import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Login from "../Pages/Account/Login";
import Logs from "../Pages/Log/Logs";
import Traces from "../Pages/Trace/Traces";
import Statistics from "../Pages/Statistics/Statistics";
import ServerError from "../Pages/Errors/ServerError";
import NotFound from "../Pages/Errors/NotFound";
import RequireAuth from "./RequireAuth";

// TODO: what to implement else here?
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: "logs", element: <Logs />},
                {path: "traces", element: <Traces />},
                {path: 'statistics', element: <Statistics />},
            ]},
            {path: '', element: <Logs />},
            {path: 'logs', element: <Logs />},
            {path: 'traces', element: <Traces />},
            {path: 'statistics', element: <Statistics />},
            {path: 'login', element: <Login />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to='not-found' />},
        ]
    }
]);