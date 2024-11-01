import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilteredAndPaginatedProducts, Product } from "../../../types/product.types";

interface ProductState {
  products: FilteredAndPaginatedProducts | null;
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  products: null,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<FilteredAndPaginatedProducts | null>) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct } = productSlice.actions;
export default productSlice;
