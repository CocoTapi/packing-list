import { createSlice } from "@reduxjs/toolkit";
import { tripsApi } from "../apis/tripsApi";

const tripSlice = createSlice({
    name: 'trip',
    initialState: {},
    reducers: {
        changeName: async (state, action) => {
            state.name = action.payload;
        },
        addTrip: async (state, action) => {
            try {
                await tripsApi.submitForm(action.payload);
            } catch (error) {
                console.log(error)
            }
        }
    }
});

export const { changeName, addTrip } = tripSlice.actions;
//export const carsReducer = tripSlice.reducer; 