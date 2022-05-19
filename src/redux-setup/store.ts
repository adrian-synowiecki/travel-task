import { configureStore } from "@reduxjs/toolkit";

// import coordinatesReducer from "./features/coordinatesSlice";
// import travelDetailsReducer from "./features/travelDetailsSlice";
import rootReducer from "./root-reducer";
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
