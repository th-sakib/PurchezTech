import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_URL = "api/v1/user";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    credentials: "include",
  }),
  tagTypes: ["User"], // For cache management
  endpoints: (builder) => ({
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
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useLogoutUserMutation,
} = apiSlice;
