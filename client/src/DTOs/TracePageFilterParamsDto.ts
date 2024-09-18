import { Page } from "../Biz/Types/Page";
import { TraceFilter } from "../Biz/Types/TraceFilter";

export interface FilterParams extends TraceFilter, Page {
}