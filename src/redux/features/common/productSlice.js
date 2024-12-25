import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    removeProduct: (state) => {
      state.product = null;
    },
  },
});

export const { setProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
