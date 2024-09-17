import { LayerType } from "./LayerType";
import { Period } from "./Period";
import { Products } from "./Products";
import { Severity } from "./Severity";

export interface LogFilterParamsDto {
    pageNumber: number;
    pageSize: number;
    products: Products;
    messageSearchTerm: string;
    showMarkedOnly: boolean;
    period: Period;
    severity: Severity;
    layerType: LayerType;
}