// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { getBaseUrl } from "../../../utils/baseURL"

// const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${getBaseUrl()}/api/auth`,
//         credentials: 'include',
//     }),
//     tagTypes: ["User"],

//     endpoints: (builder) => ({
//         registerUser: builder.mutation({
//             query: (newUser) => ({
//                 url: "/register",
//                 method: "POST",
//                 body: newUser
//             })
//         }),
//         loginUser: builder.mutation({
//             query: (credentials) => ({
//                 url: "/login",
//                 method: "POST",
//                 body: credentials
//             })
//         }),
//         logoutUser: builder.mutation({
//             query: () => ({
//                 url: "/logout",
//                 method: "POST"
//             })
//         }),
//         getUser: builder.query({
//              query: () => ({
//                 url: "/users",
//                 method: "GET"
//             }),
//             refetchOnMount: true,
//             invalidateTags: ["User"],
//         }),
//         deleteUser: builder.mutation({
//              query: (userId) => ({
//                 url: (`/users/${userId}`),
//                 method: "DELETE",
//             }),
//             invalidateTags: ["User"],
//         }),
//         updateUserRole: builder.mutation({
//               query: ({userId, role}) => ({
//                 url: `/users/${userId}`,
//                 method: "PUT",
//                 body: {role}
//             }),
//             refetchOnMount: true,
//             invalidateTags: ["User"],
//         }),
//         editProfile:  builder.mutation({
//             query: ({profileData}) => ({
//             url: `/edit-profile`,
//             method: "PATCH",
//             body: profileData
//             }),
//         })
//     }),
// }); 

// export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation, useEditProfileMutation } = authApi;
// export default authApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include", // send/receive cookies (needed for SameSite=None)
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    getUser: builder.query({
      query: () => "/users",
      providesTags: ["User"], // <- use providesTags for queries
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"], // <- mutations use invalidatesTags
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),

    // Accept the profile object directly (not { profileData })
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: "/edit-profile",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
} = authApi;

export default authApi;
