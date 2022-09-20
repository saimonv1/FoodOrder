import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {},
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    changeLocation(state, action) {
      const newLocation = action.payload.location;
      var splitLocation = newLocation.split(/, /);
      state.location = {
        country: splitLocation[2],
        city: splitLocation[1],
        address: splitLocation[0],
      };
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
