import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import calculateTravelCostHelper from "utils/calculateTravelCostHelper";
import calculateTravelTimeHelper from "utils/calculateTravelTimeHelper";

export interface TravelDetailsState {
  travelCost: number;
  travelTime: number;
}

const initialState: TravelDetailsState = {
  travelCost: 0,
  travelTime: 0,
};

export const travelDetailsSlice = createSlice({
  name: "travel-details",
  initialState,
  reducers: {
    calculateTravelCost: (
      state,
      action: PayloadAction<{ costPerKilometer: number; distance: number }>
    ) => {
      state.travelCost = calculateTravelCostHelper(
        action.payload.costPerKilometer,
        action.payload.distance
      );
    },
    calculateTravelTime: (state, action: PayloadAction<number>) => {
        state.travelTime =  calculateTravelTimeHelper(action.payload)
    },
  },
});

export const { calculateTravelCost, calculateTravelTime } = travelDetailsSlice.actions;

export default travelDetailsSlice.reducer;
