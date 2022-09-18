import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
});

export const cartActions = cartSlice.actions;
export default cartSlice;
