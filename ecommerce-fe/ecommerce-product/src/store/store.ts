import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
const rootReducer = combineReducers({
  product: productSlice.reducer,
  category: categorySlice.reducer,
});

const Store = configureStore({
  reducer: rootReducer,
});

export { Store };
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;