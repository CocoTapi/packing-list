import { createSlice, nanoid } from '@reduxjs/toolkit';

const tripsSlice = createSlice({
    name: 'trips',
    initialState: {
        serchTerm: '',
        trips: []
    },
    reducers: {
        changeSearchTerm(state, action) {
            state.serchTerm = action.payload;   
        },
        addTrip(state, action) {
            //Assumption:
            //action.payload === { name: 'ad'}
            state.trips.push({
                name: action.payload.name,
                id: nanoid(),
            });
        },
        removeTrip(state, action) {
            //Assumption:
            //action.payload === the id of the car we want to remove
            const updated = state.cars.filter((trip) => {
                return trip.id !== action.payload;
            });
            state.trips = updated;
        }
    }
})

export const { chageSerchTerm, addTrip, removeTrip } = tripsSlice.actions;
export const tripsReducer = tripsSlice