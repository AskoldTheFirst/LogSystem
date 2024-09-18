import { Products } from "./Products";

export interface TraceFilter {
    messageSearchTerm: string;
    userSearchTerm: string;
    products: Products;
}