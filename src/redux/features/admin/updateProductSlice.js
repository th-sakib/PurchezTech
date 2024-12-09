import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

const updateProductSlice = createSlice({
  name: "updateProduct",
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

export const { setProduct, removeProduct } = updateProductSlice.actions;
export default updateProductSlice.reducer;
