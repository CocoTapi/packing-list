import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tripsApi } from "./apis/tripsApi";

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

