export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
  historicPrice?: number[];
  manufacturingCountry?: string;
  sales?: number,
  salesEvolution?: number[]
}
