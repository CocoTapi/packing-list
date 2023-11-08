import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from '@faker-js/faker';

const itemsApi = createApi({
    reducerPath: 'items',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder) {
        return {
            fetchItems: builder.query({
                providesTags: (result, error, luggage) => {
                    const tags = result.map((item) => {
                        return { type: 'Item', id: item.id}
                    });
                    tags.push({ type: 'LuggagesItem', id: luggage.id});
                    return tags;
                },
                query: (luggage) => {
                    return {
                        url: '/items',
                        params: {
                            luggageId: luggage.luggageId
                        },
                        method: 'GET'
                    }
                }                               
            }),
            addItem: builder.mutation({
                invalidatesTags: (result, error, luggage) => {
                    return [{ type: 'LuggagesItem', id: luggage.id}]
                },
                query: (luggage) => {
                    return {
                        method: 'POST',
                        url: '/items',
                        body: {
                            luggageId: luggage.id,
                            entry: faker.commerce.productName()
                        }
                    }
                }
            }),
            removeItem: builder.mutation({
                invalidatesTags: (result, error, item) => {
                    return [{ type: 'Item', id: item.id}]
                },
                query: (item) => {
                    return {
                        method: 'DELETE',
                        url: `/items/${item.id}`
                    };
                },
            }),
        };
    }
});

export const {
    useFetchItemsQuery,
    useAddItemMutation,
    useRemoveItemMutation
} = itemsApi;
export { itemsApi };