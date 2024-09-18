import { LayerType } from "./LayerType";
import { Products } from "./Products";
import { Severity } from "./Severity";

export interface LogFilter {
    messageSearchTerm: string;
    userSearchTerm: string;
    products: Products;
    severity: Severity;
    layerType: LayerType;
}