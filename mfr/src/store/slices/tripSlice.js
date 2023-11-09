import { createSlice } from "@reduxjs/toolkit";
import { tripsApi } from "../apis/tripsApi";

const tripSlice = createSlice({
    name: 'trip',
    initialState: {},
    reducers: {
        submitForm: async (state, action) => {
            try {
                const response = await tripsApi.submitForm(action.payload);
            } catch (error) {
                console.log(error)
            }
        },
    }
});

export const { submitForm } = tripSlice.actions;
//export const carsReducer = tripSlice.reducer; 