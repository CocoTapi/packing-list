import { createSlice } from "@reduxjs/toolkit";
import { tripsApi } from "../apis/tripsApi";

const formSlice = createSlice({
    name: 'form',
    initialState: {
        name: ''
    },
    reducers: {
        changeName:(state, action) => {
            state.name = action.payload;
        }
    }
});

export const { changeName } = formSlice.actions;
export const formReducer = formSlice.reducer; 