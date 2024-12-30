import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "default",
};

const filterCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = filterCategorySlice.actions;
export default filterCategorySlice.reducer;
