import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// DEV ONLY!!!
const pause = (duration) => {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
};

const luggagesApi = createApi({
	reducerPath: 'luggages',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.50.179:3005', //this must change if your IP changes
		fetchFn: async (...args) => {
			//REMOVE FOR PRODUCTION. ONLY FOR TEST
			// await pause(1000); //removing this as we no longer want to simulate delays
			return fetch(...args);
		},
	}),
	endpoints(builder) {
		return {
			fetchLuggage: builder.query({
				providesTags: (result, error, trip) => {
					console.log(result);
					const tags = result.map((luggage) => {
						return { type: 'Luggage', id: luggage.id };
					});
					tags.push(result.map((luggage) => {
						return { type: 'TripsLuggage', id: luggage.tripId };
						})
					);
					return tags;
				},
				query: (trip) => {
					return {
						url: '/luggages',
						params: {
							//tripId: trip.id,
						},
						method: 'GET',
					};
				},
			}),
			addLuggage: builder.mutation({
				invalidatesTags: (result, error, trip) => {
					return [{ type: 'TripsLuggage', id: trip.id }];
				},
				query: (trip) => {
					return {
						url: 'luggages',
						method: 'POST',
						body: {
							tripId: trip.id,
							title: "XXXX",
						},
					};
				},
			}),
			removeLuggage: builder.mutation({
				invalidatesTags: (result, error, luggage) => {
					return [{ type: 'Luggage', id: luggage.id }];
				},
				query: (luggage) => {
					return {
						url: `/luggages/${luggage.id}`,
						method: 'DELETE',
					};
				},
			}),
		};
	},
});

export const {
	useFetchLuggageQuery,
	useAddLuggageMutation,
	useRemoveLuggageMutation,
} = luggagesApi;
export { luggagesApi };
