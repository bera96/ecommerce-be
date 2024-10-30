import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct } = productSlice.actions;
export default productSlice;
