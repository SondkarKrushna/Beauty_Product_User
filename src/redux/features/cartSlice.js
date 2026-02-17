import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  wishlistItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    setWishlist: (state, action) => {
      state.wishlistItems = action.payload;
    },

    toggleWishlist: (state, action) => {
      const id = action.payload;
      if (!state.wishlistItems.includes(id)) {
        state.wishlistItems = [...state.wishlistItems, id]; // new array → re-render
      }
     
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCart,
  toggleWishlist,
  setWishlist,
} = cartSlice.actions;

export default cartSlice.reducer;
