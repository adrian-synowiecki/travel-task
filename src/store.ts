import { configureStore } from "@reduxjs/toolkit";

import coordinatesReducer from "./features/coordinatesSlice";
import travelDetailsReducer from "./features/travelDetailsSlice";

export const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
    travelDetails: travelDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
