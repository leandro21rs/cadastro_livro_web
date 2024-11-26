import { ProductOrderSmall } from "./ProductOrderSmall";

export interface Products {
    id?: string,
    code?: string,
    name?: string,
    description?: string,
    image?: string,
    price?: number,
    category?: string,
    quantity?: number,
    inventoryStatus?: string,
    rating?: number,
    orders?: Array<ProductOrderSmall>
}