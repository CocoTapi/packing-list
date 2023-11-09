import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tripsApi } from "./apis/tripsApi";
import { luggagesApi } from "./apis/luggagesApi";
import { itemsApi } from "./apis/itemsApi";
import { tripsReducer, addTrip, removeTrip, changeSearchTerm } from "./slices/tripsSlice";
import { formReducer, changeName } from "./slices/formSlice";

export const store = configureStore({
    reducer: {
        [tripsApi.reducerPath]: tripsApi.reducer,
        [luggagesApi.reducerPath]: luggagesApi.reducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
        trips: tripsReducer,
        form: formReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(tripsApi.middleware)
            .concat(luggagesApi.middleware)
            .concat(itemsApi.middleware)
    }
});

setupListeners(store.dispatch);

export {
    useFetchTripsQuery,
    useAddTripMutation,
    useRemoveTripMutation
} from './apis/tripsApi';
export { 
    useFetchLuggageQuery, 
    useAddLuggageMutation, 
    useRemoveLuggageMutation 
} from './apis/luggagesApi';
export {
    useFetchItemsQuery,
    useAddItemMutation,
    useRemoveItemMutation
} from './apis/itemsApi';

export {
    changeName,
    addTrip,
    removeTrip,
    changeSearchTerm
};

