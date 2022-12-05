import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: null,
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    changeLocation(state, action) {
      const newLocation = action.payload.location;
      state.location = newLocation;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
