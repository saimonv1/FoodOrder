import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: null,
  cartItems: [],
  totalPrice: 0.00,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    changeLocation(state, action) {
      const newLocation = action.payload.location;
      state.location = newLocation;
    },
    addDish(state, action) {
      if(state.cartItems.some((item) => item._id === action.payload.dish._id)){
        return;
      }
      state.cartItems.push(action.payload.dish);
      const priceToAdd = parseFloat(action.payload.dish.price["$numberDecimal"]).toFixed(2);
      state.totalPrice = state.totalPrice + priceToAdd;
    },
    removeDish(state, action) {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload.dish._id);
      const priceToRemove = parseFloat(action.payload.dish.price["$numberDecimal"]).toFixed(2);
      state.totalPrice = state.totalPrice - priceToRemove;
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalPrice.toFixed(2);
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
