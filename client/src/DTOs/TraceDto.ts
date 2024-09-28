import { Products } from "../Biz/Types/Products";

export interface TraceDto  {
    product: Products;
    message: string;
    username?: string;
    dt: string;
    ticks?: number;
    sessionId?: string;
    tag1: string;
    tag2: string;
    tag3: string;
}