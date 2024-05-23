import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../helpers/localStorageHelpers";

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: getFromLocalStorage("user") || {
    login: "Rodion",
    password: "mypassword",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      saveToLocalStorage("user", action.payload);
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUser } = authSlice.actions;
