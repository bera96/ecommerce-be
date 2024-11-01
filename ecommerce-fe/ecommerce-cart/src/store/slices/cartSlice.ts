import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  productId: string;
  image: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  expiresAt: string;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  expiresAt: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.expiresAt = action.payload.expiresAt;
    },
    updateCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.expiresAt = "";
    },
  },
});

export const { setCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice;
