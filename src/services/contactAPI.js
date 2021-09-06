import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactAPI = createApi({
  reducerPath: "contactAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6129dddc068adf001789b947.mockapi.io/api/v1/",
  }),
  tagTypes: ["Contacts"],

  endpoints: (builder) => ({
    fetchContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ["Contacts"],
    }),

    addContact: builder.mutation({
      query: (newContact) => ({
        url: `/contacts`,
        method: "POST",
        body: newContact,
      }),
      invalidatesTags: ["Contacts"],
    }),

    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/contacts/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactAPI;