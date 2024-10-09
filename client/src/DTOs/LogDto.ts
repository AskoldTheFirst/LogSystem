import { LayerType } from "../Biz/Types/LayerType";
import { Products } from "../Biz/Types/Products";
import { Severity } from "../Biz/Types/Severity";

export interface LogDto  {
    product: Products;
    severity: Severity;
    date: string;
    message: string;
    username?: string;
    requestCtx: string;
    environmentCtx: string;
    browser?: string;
    ipAddress?: string;
    exception?: string;
    layerType: LayerType;
    tag1: string;
    tag2: string;
    tag3: string;
}