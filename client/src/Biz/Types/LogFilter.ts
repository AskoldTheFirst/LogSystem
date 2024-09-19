import { LayerType } from "./LayerType";
import { Products } from "./Products";
import { Severity } from "./Severity";

export interface LogFilter {
    messageSearchTerm: string;
    userSearchTerm: string;
    product: Products;
    severity: Severity;
    layerType: LayerType;
}