import coordinatesReducer from "features/coordinatesSlice";
import travelDetailsReducer from "features/travelDetailsSlice";

export const rootReducer = {
  coordinates: coordinatesReducer,
  travelDetails: travelDetailsReducer,
};

export default rootReducer