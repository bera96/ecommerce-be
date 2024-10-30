import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../../types/category.types";

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategories, setSelectedCategory } = categorySlice.actions;
export default categorySlice;
