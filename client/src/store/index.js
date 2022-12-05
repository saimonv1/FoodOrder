import { configureStore } from "@reduxjs/toolkit";

import appSlice from "./app-slice";
import authSlice from "./auth-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: { app: appSlice.reducer, auth: authSlice.reducer, cart: cartSlice.reducer },
});

export default store;
