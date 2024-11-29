import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
};

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state = action.payload;
    },
    clearProduct: (state) => {
      state = [];
    },
  },
});
