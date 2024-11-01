export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  image: string;
}

export interface FilteredAndPaginatedProducts {
  items: Product[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
