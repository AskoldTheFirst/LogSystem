import { LayerType } from "./LayerType";
import { Products } from "./Products";
import { Severity } from "./Severity";

export interface LogFilterParamsDto {
    pageNumber: number;
    pageSize: number;
    products: Products;
    messageSearchTerm: string;
    severity: Severity;
    layerType: LayerType;
}