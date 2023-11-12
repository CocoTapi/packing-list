import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const itemsApi = createApi({
	reducerPath: 'items',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.50.179:3005', //this must change if your IP changes
	}),
	endpoints(builder) {
		return {
			fetchItems: builder.query({
				providesTags: (result, error, luggage) => {
					const tags = result.map((item) => {
						return { type: 'Item', id: item.id };
					});
					tags.push({ type: 'LuggagesItem', id: luggage.id });
					return tags;
				},
				query: (luggage) => {
					return {
						url: '/items',
						params: {
							parentId: luggage.id,
						},
						method: 'GET',
					};
				},
			}),
			addItem: builder.mutation({
				invalidatesTags: (result, error, luggage) => {
					return [{ type: 'LuggagesItem', id: luggage.id }];
				},
				query: ({name, parentId}) => {
					return {
						method: 'POST',
						url: '/items',
						body: {
							parentId,
                            name
						},
					};
				},
			}),
			removeItem: builder.mutation({
				invalidatesTags: (result, error, item) => {
					return [{ type: 'Item', id: item.id }];
				},
				query: (item) => {
					return {
						method: 'DELETE',
						url: `/items/${item.id}`,
					};
				},
			}),
		};
	},
});

export const { useFetchItemsQuery, useAddItemMutation, useRemoveItemMutation } =
	itemsApi;
export { itemsApi };
