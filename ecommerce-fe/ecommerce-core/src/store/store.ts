import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { combineReducers } from "redux";

const federatedSlices = {
  login: await import("auth/loginSlice").then((module) => module.default.reducer),
};

const initStore = async () => {
  const Store = configureStore({
    reducer: combineReducers({
      ...federatedSlices,
    }),
  });
  return Store;
};


export type RootState = ReturnType<any>;
export type AppDispatch = any;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default initStore;
