import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearUser } from "../features/user/userSlice";
import Swal from "sweetalert2";

const USER_URL = "api/v1/user";
const ADMIN_URL = "api/v1/admin";

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
  // console.log(result);

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
  tagTypes: ["User", "Product"], // For cache management
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
      query: () => `${ADMIN_URL}/get-product`,
      providesTags: ["Product"],
    }),

    // to delete individual product - POST
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/delete-product/${id}`,
        method: "POST",
      }),

      invalidatesTags: ["Product"],
    }),

    // to update | edit product - PUT
    updateProduct: builder.mutation({
      query: (id, formData) => ({
        url: `${ADMIN_URL}/update-product/${id}`,
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: ["Product"],
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
  useDeleteProductMutation,
  useUpdateProductMutation,
  useDeleteUploadedProductMutation,
} = apiSlice;
