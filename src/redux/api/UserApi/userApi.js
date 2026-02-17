import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: ["Cart", "Profile", "Products", "Wishlist"],
  endpoints: (builder) => ({
    getAllUserProducts: builder.query({
      query: () => ({
        url: `/api/user/get/all/user/product`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getUserProductById: builder.query({
      query: (productId) => ({
        url: `/api/user/get/product/${productId}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    likeProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `/api/user/product/like`,
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    getUserProfile: builder.query({
      query: () => `/api/user/get/profile`,
      providesTags: ["Profile"],
    }),

    getMyProducts: builder.query({
      query: () => `api/user/get/order/place`,
      providesTags: ["Products"],
    }),


    getCart: builder.query({
      query: () => "/api/cart/get",
      providesTags: ["Cart"],
    }),

    addUserAddress: builder.mutation({
      query: (addressData) => ({
        url: `/api/user/address/add`,
        method: "PUT",
        body: { address: addressData },
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteUserAddress: builder.mutation({
      query: (addressId) => ({
        url: `/api/user/address/delete/${addressId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Profile"],
    }),

    contactUs: builder.mutation({
      query: (data) => ({
        url: "/contact/us",
        method: "POST",
        body: data,
      }),
    }),

    getRecommendation: builder.query({
      query: () => ({
        url: "/api/user/get/recommandation",
        method: "GET",
      }),
    }),

    getUserSale: builder.query({
      query: () => "/api/user/get/sale",
      method: "GET",
    }),

    getLoginSale: builder.query({
      query: () => ({
        url: `/api/user/get/login/sale`,
        method: "GET",
      }),
    }),

    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/api/cart/add",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: "/api/cart/remove",
        method: "DELETE",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),
    getUserSaleById: builder.query({
      query: (saleId) => ({
        url: `/api/user/get/sale/${saleId}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllUserProductsQuery,
  useGetUserProductByIdQuery,
  useLikeProductMutation,
  useGetUserProfileQuery,
  useAddUserAddressMutation,
  useDeleteUserAddressMutation,
  useContactUsMutation,
  useGetMyProductsQuery,
  useGetCartQuery,
  useGetRecommendationQuery,
  useGetUserSaleQuery,
  useGetLoginSaleQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetUserSaleByIdQuery,
} = productApi;
