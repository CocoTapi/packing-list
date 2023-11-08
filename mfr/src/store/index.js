import { configureStore } from "@reduxjs/toolkit";
import { tripsApi } from "./apis/tripsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [tripsApi.reducerPath]: tripsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(tripsApi.middleware)
    }
});

setupListeners(store.dispatch);

export {
    useFetchTripsQuery,
    useAddTripMutation
} from './apis/tripsApi';

