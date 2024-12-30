import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/common/productSlice";
import searchReducer from "./features/user/searchSlice";
import filterCategoryReducer from "./features/user/filterCategorySlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    product: productReducer,
    search: searchReducer,
    category: filterCategoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production", // only enable devTools in development
});

export default store;
