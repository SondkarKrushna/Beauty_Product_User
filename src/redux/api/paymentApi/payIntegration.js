import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({

    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/api/user/payment/verify",
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const {  useVerifyPaymentMutation } = paymentApi;
