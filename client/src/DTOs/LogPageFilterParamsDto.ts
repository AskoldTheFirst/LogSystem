import { LogFilter } from "../Biz/Types/LogFilter";
import { Page } from "../Biz/Types/Page";

export interface LogPageFilterParamsDto extends LogFilter, Page {
}