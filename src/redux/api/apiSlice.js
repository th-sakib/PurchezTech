import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearUser } from "../features/user/userSlice";
import Swal from "sweetalert2";

const USER_URL = "api/v1/user";
const ADMIN_URL = "api/v1/admin";
const GLOBAL_URL = "api/v1";
const SHOP_URL = "api/v1/shop";

// default base query
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  credentials: "include",
});

/*
the three argument in this custom query function(enhancing the base query and adding logic to it)

args: The details of the HTTP request (URL path, method, headers, body, etc.).
api: Contains information about the Redux state and dispatch, as well as additional utilities for advanced use.
extraOptions: Any additional options you might want to pass to modify the request or behavior.
*/
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  result?.error && console.log(result?.error?.data?.message);

  if (
    result?.error?.status === 401 &&
    result?.error?.data?.message === "jwt expired"
  ) {
    console.log("jwt expired, attempting to refresh...");

    const refreshResult = await baseQuery(
      {
        url: `${USER_URL}/refresh-token`,
        method: "POST",
      },
      api,
      extraOptions
    );

    // console.log("refresh result : ", refreshResult); // clear this

    if (refreshResult?.data) {
      console.log("Token refreshed, Retrying the original request...");

      result = await baseQuery(args, api, extraOptions);
      // console.log("inner result", result);
    } else {
      // logout user
      await baseQuery(
        {
          url: `${USER_URL}/logout`,
          method: "POST",
        },
        api,
        extraOptions
      );
      api.dispatch(clearUser());

      // alert message
      Swal.fire({
        title: "You've logged out!",
        text: "Session ends, Please log in again",
        icon: "error",
        confirmButtonColor: "#0077B6",
      });
    }
  }

  // if jwt not found
  if (
    result?.error?.data?.message === "Access Token not found" ||
    result?.error?.status === "FETCH_ERROR"
  )
    api.dispatch(clearUser());
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User", "Product", "Cart"], // For cache management
  endpoints: (builder) => ({
    // refresh access token - POST
    refreshAccessToken: builder.mutation({
      query: () => ({
        url: `${USER_URL}/refresh-token`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    // user register / signup endpoint - POST
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    // check authenticity - GET
    getAuthenticity: builder.query({
      query: () => ({
        url: `${USER_URL}/authenticity`,
        providesTags: ["User"],
      }),
    }),

    // to login user - POST
    loginUser: builder.mutation({
      query: (user) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    // login user with GOOGLE
    googleLogin: builder.mutation({
      query: (code) => ({
        url: `${USER_URL}/google-login`,
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["User"],
    }),

    // to logout user - POST
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    // to get user - GET
    getUser: builder.query({
      query: () => `${USER_URL}/current-user`,
      providesTags: ["User"],
    }),

    // admin endpoints
    // upload image to cloudinary - POST this one is handled with xmlhttprequest in the productImage page
    // uploadProduct: builder.mutation({
    //   query: (formImg) => ({
    //     url: `${ADMIN_URL}/upload-product`,
    //     method: "POST",
    //     body: formImg,
    //   }),
    //   invalidatesTags: [],
    // }),

    // delete cloudinary product
    deleteUploadedProduct: builder.mutation({
      query: (publicID) => ({
        url: `${ADMIN_URL}/delete-cloud-product`,
        method: "DELETE",
        body: { publicID },
      }),
    }),

    // to create product - POST
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${ADMIN_URL}/create-product`,
        method: "POST",
        body: productData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Product"],
    }),

    // to get all product list - GET
    getAllProduct: builder.query({
      query: ({
        category,
        brand,
        sortByPrice,
        sortByDate,
        search,
        minPrice,
        maxPrice,
        page,
        limit,
      }) => {
        let queryString = "?";

        if (category) queryString += `category=${category}&`;
        if (brand) queryString += `brand=${brand}&`;
        if (sortByPrice) queryString += `sortByPrice=${sortByPrice}&`;
        if (sortByDate) queryString += `sortByDate=${sortByDate}&`;
        if (minPrice) queryString += `minPrice=${minPrice}&`;
        if (maxPrice) queryString += `maxPrice=${maxPrice}&`;
        if (page) queryString += `page=${page}&`;
        if (limit) queryString += `limit=${limit}&`;
        if (search) queryString += `search=${search}`;

        return `${GLOBAL_URL}/get-products${queryString}`;
      },

      providesTags: ["Product"],
    }),

    // to get individual product - GET
    getProduct: builder.query({
      query: ({ id }) => `${GLOBAL_URL}/get-product/${id}`,
      providesTags: ["Product"],
    }),

    // to delete individual product - POST
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/delete-product/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Product"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getAllProduct", undefined, (draft) => {
            const productIndex = draft.data.findIndex(
              (product) => product.id === id
            );
            draft.data.splice(productIndex, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    // to update | edit product - PUT
    updateProduct: builder.mutation({
      query: (formData) => ({
        url: `${ADMIN_URL}/update-product/${formData.id}`,
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: ["Product"],
    }),

    // cart related endpoints
    addToCart: builder.mutation({
      query: ({ productId, userId, quantity }) => ({
        url: `${SHOP_URL}/add-to-cart`,
        method: "POST",
        body: { productId, userId, quantity },
      }),

      invalidatesTags: ["Cart"],
    }),

    //fetch cart
    fetchCart: builder.query({
      query: ({ userId }) => `${SHOP_URL}/get-cart/${userId}`,

      providesTags: ["Cart"],
    }),

    // delete cart item
    deleteCartItem: builder.mutation({
      query: ({ productId, userId }) => ({
        url: `${SHOP_URL}/delete-cart/${productId}/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
      async onQueryStarted(
        { productId, userId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("fetchCart", { userId }, (draft) => {
            const productIndex = draft.data.items.findIndex(
              (item) => item.productId === productId
            );
            if (productIndex >= 0) {
              draft.data.items.splice(productIndex, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          // Undo changes in case of error
          console.error("Error during mutation:", error); // Log the error
          patchResult.undo();
        }
      },
    }),

    // update cart quantity
    updateCartQuantity: builder.mutation({
      query: ({ productId, userId, quantity }) => ({
        url: `${SHOP_URL}/update-cart`,
        method: "PATCH",
        body: { productId, userId, quantity },
      }),

      invalidatesTags: ["Cart"],
      async onQueryStarted(
        { productId, quantity, userId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("fetchCart", { userId }, (draft) => {
            const productIndex = draft.data.items.findIndex(
              (item) => item.productId === productId
            );
            if (productIndex >= 0) {
              draft.data.items[productIndex].quantity = quantity;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          // Undo changes in case of error
          console.error("Error during mutation:", error); // Log the error
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useRefreshAccessTokenMutation,

  useRegisterUserMutation,
  useLoginUserMutation,
  useGoogleLoginMutation,

  useGetUserQuery,
  useLazyGetAuthenticityQuery,
  useLogoutUserMutation,
  useCreateProductMutation,
  useUploadProductMutation,

  useGetAllProductQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useDeleteUploadedProductMutation,

  useAddToCartMutation,
  useFetchCartQuery,
  useLazyFetchCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartQuantityMutation,
} = apiSlice;
