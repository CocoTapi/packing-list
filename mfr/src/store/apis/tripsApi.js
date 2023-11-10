import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { faker } from '@faker-js/faker';

// DEV ONLY!!!
// const pause = (duration) => {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, duration);
// 	});
// };

const tripsApi = createApi({
	reducerPath: 'trips',
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
			fetchTrips: builder.query({
				providesTags: (result, error, trip) => {
					const tags = result.map((trip) => {
						return { type: 'Trip', id: trip.id };
					});
					return tags;
				},
				query: () => {
					return {
						url: '/trips',
						// params: {
						//     id: trip.id,
						// },
						method: 'GET',
					};
				},
			}),
			addTrip: builder.mutation({
				invalidatesTags: (result, error, trip) => {
					return [{ type: 'Trip' }];
				},
				query: (trip) => {
					return {
						url: 'trips',
						method: 'POST',
						body: {
							trip,
						},
					};
				},
			}),
			removeTrip: builder.mutation({
				invalidatesTags: (result, error, trip) => {
					return [{ type: 'Trip', id: trip.id }];
				},
				query: (trip) => {
					return {
						url: `/trips/${trip.id}`,
						method: 'DELETE',
					};
				},
			}),
		};
	},
});

export const { useFetchTripsQuery, useAddTripMutation, useRemoveTripMutation } =
	tripsApi;
export { tripsApi };
