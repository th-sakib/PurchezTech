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
    // refresh access token
    refreshAccessToken: builder.mutation({
      query: () => ({
        url: `${USER_URL}/refresh-token`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    // user register / singup endpoint
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query({
      query: () => `${USER_URL}/current-user`,
      providesTags: ["User"],
    }),

    // admin - upload product
    uploadProduct: builder.mutation({
      query: (formImg) => ({
        url: `${ADMIN_URL}/upload-product`,
        method: "POST",
        body: formImg,
      }),
      invalidatesTags: ["Product"],
    }),

    // to create product
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
  }),
});

export const {
  useRefreshAccessTokenMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useLogoutUserMutation,
  useCreateProductMutation,
  useUploadProductMutation,
} = apiSlice;
