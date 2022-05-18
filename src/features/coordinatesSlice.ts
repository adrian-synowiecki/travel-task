import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CoordinatesState {
  startingPointCoordinates: number[];
  destinationPointCoordinates: number[];
  startingCity: string;
  destinationCity: string;
  distance: number;
}

const initialState: CoordinatesState = {
  startingPointCoordinates: [],
  destinationPointCoordinates: [],
  startingCity: "",
  destinationCity: "",
  distance: 0,
};

export const coordinatesSlice = createSlice({
  name: "coordinates",
  initialState,
  reducers: {
    addStartingPointCoordinates: (state, action: PayloadAction<number[]>) => {
      state.startingPointCoordinates = action.payload;
    },
    addDestinationPointCoordinates: (
      state,
      action: PayloadAction<number[]>
    ) => {
      state.destinationPointCoordinates = action.payload;
    },
    addStartingCity: (state, action: PayloadAction<string>) => {
      state.startingCity = action.payload;
    },
    addDestinationCity: (state, action: PayloadAction<string>) => {
      state.destinationCity = action.payload;
    },
    addDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    calculateTripCost: (
      state,
      action: PayloadAction<{ kmCost: number; distance: number }>
    ) => {},
  },
});

export const {
  addStartingPointCoordinates,
  addDestinationPointCoordinates,
  addStartingCity,
  addDestinationCity,
  addDistance,
  calculateTripCost,
} = coordinatesSlice.actions;

export default coordinatesSlice.reducer;
