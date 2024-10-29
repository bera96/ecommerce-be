import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isAuthenticated: boolean;
  };
}

const initialState: LoginState = {
  user: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    isAuthenticated: false,
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload, isAuthenticated: true };
    },
    clearUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;

export { loginSlice };

export default loginSlice;
