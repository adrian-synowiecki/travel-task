import { configureStore } from "@reduxjs/toolkit";

import coordinatesReducer from "./features/coordinatesSlice";

export const store = configureStore({
  reducer: {
    coordinates: coordinatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
