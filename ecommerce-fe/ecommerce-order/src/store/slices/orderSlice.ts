import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  totalAmount: number;
}

export interface OrderState {
  _id: string;
  userId: string;
  totalAmount: number;
  items: OrderItem[];
  trackingNumber: string;
  createdAt: string;
}

const initialState: OrderState = {
  _id: "",
  userId: "",
  totalAmount: 0,
  items: [],
  trackingNumber: "",
  createdAt: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderState>) => {
      state._id = action.payload._id;
      state.userId = action.payload.userId;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.trackingNumber = action.payload.trackingNumber;
      state.createdAt = action.payload.createdAt;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice;
