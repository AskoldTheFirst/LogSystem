import { UserDto } from "../../DTOs/UserDto";
import { LayerType } from "./LayerType";
import { LogFilter } from "./LogFilter";
import { Products } from "./Products";
import { Severity } from "./Severity";
import { TraceFilter } from "./TraceFilter";

export interface AppState {
    user: UserDto | null;
    setUser: ((user: UserDto | null) => void) | null;
    logFilter: LogFilter;
    setLogFilter: (log: LogFilter) => void;
    traceFilter: TraceFilter;
    setTraceFilter: (log: TraceFilter) => void;
}

export function DefaultAppState() : AppState {
    return {
        user: null,
        setUser: (user: UserDto | null) => user,
        
        logFilter: {
            messageSearchTerm: '',
            userSearchTerm: '',
            product: Products.All,
            severity: Severity.All,
            layerType: LayerType.All
        },
        setLogFilter: (log: LogFilter) => log,

        traceFilter: {
            messageSearchTerm: '',
            userSearchTerm: '',
            product: Products.All,
        },
        setTraceFilter: (trace: TraceFilter) => trace,
    };
}