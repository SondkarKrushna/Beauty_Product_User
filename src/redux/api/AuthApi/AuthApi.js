import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/api/user/register",
        method: "POST",
        body: userData,
      }),
    }),

    verifyRegisterOtp: builder.mutation({
      query: (verifyData) => ({
        url: "/api/user/verify-otp",
        method: "POST",
        body: verifyData,
      }),
    }),

    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/api/user/login",
        method: "POST",
        body: loginData,
      }),
    }),

    verifyLoginOtp: builder.mutation({
      query: (verifyData) => ({
        url: "/api/user/login/verify",
        method: "POST",
        body: verifyData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/user/logout",
        method: "POST",
      })
    })
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyRegisterOtpMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useVerifyLoginOtpMutation,
} = AuthApi;
