import { createContext, useEffect, useState } from "react";
import { UserDto } from "./DTOs/UserDto";
import http from "./Biz/http";
import { LogFilter } from "./Biz/Types/LogFilter";
import { TraceFilter } from "./Biz/Types/TraceFilter";
import { Helper } from "./Biz/Helper";
import { AppState, DefaultAppState } from "./Biz/Types/AppState";
import { router } from "./App/Routes";

export const GlobalContext = createContext<AppState>(DefaultAppState());

export const GlobalContextProvider = (props: any) => {
    const defaultAppState = DefaultAppState();

    const [user, setUser] = useState<UserDto | null>(Helper.GetCurrentUser());
    const [logFilter, setLogFilter] = useState<LogFilter>(defaultAppState.logFilter);
    const [traceFilter, setTraceFilter] = useState<TraceFilter>(defaultAppState.traceFilter);

    useEffect(() => {
        http.Account.currentUser().then(userDto => {
            if (userDto) {
                localStorage.setItem(Helper.UserKey, JSON.stringify(userDto));
                setUser(userDto);
            }
        }).catch(() => {
            signOut();
            router.navigate('/login');
        });
    }, []);

    const signOut = () => {
        setUser(null);
        localStorage.removeItem(Helper.UserKey);
    }

    const value: AppState = {
        user: user,
        setUser: setUser,
        logFilter: logFilter,
        setLogFilter: setLogFilter,
        traceFilter: traceFilter,
        setTraceFilter: setTraceFilter,
        signOut: signOut
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};
