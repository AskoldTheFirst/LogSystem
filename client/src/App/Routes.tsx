import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "../Pages/Account/Login";
import Logs from "../Pages/Log/Logs";
import Traces from "../Pages/Trace/Traces";
import Statistics from "../Pages/Statistics/Statistics";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            
            // {path: '', element: <HomePage />},
            {path: 'logs', element: <Logs />},
            {path: 'traces', element: <Traces />},
            {path: 'statistics', element: <Statistics />},
            // {path: 'about', element: <AboutPage />},
            {path: 'login', element: <Login />},
            // {path: 'register', element: <Register />},
            // {path: 'signout', element: <HomePage />},
            // {path: 'commenceTest/:testId', element: <TestCommencePage />},
            // {path: 'test', element: <TestPage />},
            // {path: 'test-result', element: <TestResultPage />},
            // {path: 'server-error', element: <ServerError />},
            // {path: 'not-found', element: <NotFound />},
            // {path: '*', element: <Navigate replace to='not-found' />},
        ]
    }
]);