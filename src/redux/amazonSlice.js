import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  userInfo: null,
};
export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    resetCart: (state) => {
      state.products = [];
    },
    // ========Product Reducerse End here ==========
    // ========UserInfo Reducers Start here ==========
    // User authentication
    setUserinfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userSignOut: (state) => {
      state.userInfo = null;
    },

    // UserInfo Reducers End here
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  incrementQuantity,
  decrementQuantity,
  setUserinfo,
  userSignOut,
} = amazonSlice.actions;
export default amazonSlice.reducer;
