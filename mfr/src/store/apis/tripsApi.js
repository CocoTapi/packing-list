import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  };

const tripsApi = createApi({
    reducerPath: 'trips',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async(...args) => {
             //REMOVE FOR PRODUCTION. ONLY FOR TEST
             await pause(1000);
             return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            fetchTrips: builder.query({
                // providesTags: (result, error, user) => {
                //     const tags = result.map(album => {
                //         return { type:'Trip', id: album.id}
                //     });
                //     tags.push({type: 'UsersAlbums', id: user.id});
                //     return tags;
                // },
                query: () => {
                    return {
                        url: '/trips',
                        // params: {
                        //     id: trip.id,
                        // },
                        method: 'GET'
                    }
                }
            }),
            addTrip: builder.mutation({
                // invalidatesTags: (result, error, user) => {
                //     return [{ type: 'UsersAlbums', id: user.id }]
                // },
                query: () => {
                    return {
                        url: 'trips',
                        method: 'POST',
                        body: {
                            name: faker.commerce.productName(),
                        }
                    }
                }
            }),
            removeTrip: builder.mutation({
                // invalidatesTags: (result, error, album) => {
                //     return [{ type: 'Album', id: album.id }]
                // },
                query: (trip) => {
                    return {
                        url: `/trips/${trip.id}`,
                        method: 'DELETE',
                    }
                }
            })
        }
    }
});

export const {
    useFetchTripsQuery,
    useAddTripMutation,
    useRemoveTripMutation
} = tripsApi;
export { tripsApi };