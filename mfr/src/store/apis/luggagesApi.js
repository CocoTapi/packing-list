import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  };

const luggagesApi = createApi({
    reducerPath: 'luggages',
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
            fetchLuggage: builder.query({
                providesTags: (result, error, trip) => {
                    const tags = result.map(luggage => {
                        return { type:'Luggage', id: luggage.id}
                    });
                    tags.push({type: 'TripsLuggage', id: trip.id});
                    return tags;
                },
                query: (trip) => {
                    return {
                        url: '/luggages',
                        params: {
                            tripId: trip.id,
                        },
                        method: 'GET'
                    }
                }
            }),
            addLuggage: builder.mutation({
                invalidatesTags: (result, error, trip) => {
                    return [{ type: 'TripsLuggage', id: trip.id }]
                },
                query: (trip) => {
                    return {
                        url: 'luggages',
                        method: 'POST',
                        body: {
                            tripId: trip.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            removeLuggage: builder.mutation({
                invalidatesTags: (result, error, luggage) => {
                    return [{ type: 'Luggage', id: luggage.id }]
                },
                query: (luggage) => {
                    return {
                        url: `/luggages/${luggage.id}`,
                        method: 'DELETE',
                    }
                }
            })
        };
    }
});

export const { 
    useFetchLuggageQuery, 
    useAddLuggageMutation, 
    useRemoveLuggageMutation 
} = luggagesApi;
export { luggagesApi };
