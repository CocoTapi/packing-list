import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../../App';
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
		baseUrl: SERVER_URL,
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
					if (!result) {
						return [{ type: 'Trip' }]; // or return an empty array if no tags should be provided
					}
					const tags = result.map((trip) => {
						return { type: 'Trip', id: trip.id };
					});
					return tags;
				},
				query: () => {
					return {
						url: '/trips',
						method: 'GET',
					};
				},
			}),
			addTrip: builder.mutation({
				invalidatesTags: (result, error, trip) => {
					return [{ type: 'Trip' }];
				},
				query: ({name}) => {
					return {
						url: 'trips',
						method: 'POST',
						body: {
							name,
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
