import { Page } from "../Biz/Types/Page";
import { TraceFilter } from "../Biz/Types/TraceFilter";

export interface TracePageFilterParamsDto extends TraceFilter, Page {
}