import { Period } from "./Period";
import { Products } from "./Products";

export interface FilterParams {
    pageNumber: number;
    pageSize: number;
    products: Products;
    messageSearchTerm: string;
    showMarkedOnly: boolean;
    period: Period;
}