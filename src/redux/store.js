import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/AuthApi/AuthApi";
import { productApi } from "./api/UserApi/userApi";
import { paymentApi } from "./api/paymentApi/payIntegration";
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    // RTK Query reducers
    [AuthApi.reducerPath]: AuthApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(productApi.middleware)
      .concat(paymentApi.middleware),
});
