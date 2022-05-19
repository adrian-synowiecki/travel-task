import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import RoutingMachine from "components/routing-machine";
import { RootState } from "redux-setup/store";
import haversine from "haversine-distance";
import { addDistance } from "features/coordinatesSlice";
import {
  calculateTravelCost,
  calculateTravelTime,
} from "features/travelDetailsSlice";

import styles from "./travel-details.module.scss";

const TravelDetails = () => {
  const [costPerKilometer, setCostPerKilometer] = useState("");
  const navigate = useNavigate();
  const startingPointCoordinates = useSelector(
    (state: RootState) => state.coordinates.startingPointCoordinates
  );
  const destinationPointCoordinates = useSelector(
    (state: RootState) => state.coordinates.destinationPointCoordinates
  );

  const startingCity = useSelector(
    (state: RootState) => state.coordinates.startingCity
  );

  const destinationCity = useSelector(
    (state: RootState) => state.coordinates.destinationCity
  );
  const distance = useSelector(
    (state: RootState) => state.coordinates.distance
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const startingPoint = {
      latitude: startingPointCoordinates[0],
      longitude: startingPointCoordinates[1],
    };
    const destinationPoint = {
      latitude: destinationPointCoordinates[0],
      longitude: destinationPointCoordinates[1],
    };

    const distance = haversine(startingPoint, destinationPoint);
    const kilometer = 1000;
    const distanceFromMetersToKm = distance / kilometer;

    dispatch(addDistance(distanceFromMetersToKm));
  }, [destinationPointCoordinates, startingPointCoordinates, dispatch]);

  useEffect(() => {
    if (Number(costPerKilometer) !== 0 || costPerKilometer !== "") {
      dispatch(
        calculateTravelCost({
          costPerKilometer: Number(costPerKilometer),
          distance,
        })
      );
    }
  }, [costPerKilometer, distance, dispatch]);

  useEffect(() => {
    if (distance) {
      dispatch(calculateTravelTime(distance));
    }
  }, [dispatch, distance]);

  const handleGenerateSummary = () => {
    navigate("/travel-summary");
  };
  return (
    <div style={{ marginTop: "25px" }}>
      <TextField
        className={styles["cost-per-kilometer"]}
        id="outlined-number"
        label="Enter the cost of a kilometer"
        type="number"
        variant="outlined"
        onChange={(e) => {
          setCostPerKilometer(e.target.value);
        }}
        InputProps={{
          inputProps: { min: 0 },
        }}
      />
      <Button
        disabled={Number(costPerKilometer) === 0 || costPerKilometer === ""}
        className={styles["generate-travel-summary"]}
        onClick={handleGenerateSummary}
        variant="contained"
      >
        Generate a summary
      </Button>
      <MapContainer zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[startingPointCoordinates[0], startingPointCoordinates[1]]}
        >
          <Popup>{startingCity}</Popup>
        </Marker>
        <Marker
          position={[
            destinationPointCoordinates[0],
            destinationPointCoordinates[1],
          ]}
        >
          <Popup>{destinationCity}</Popup>
        </Marker>

        <RoutingMachine />
      </MapContainer>
    </div>
  );
};

export default TravelDetails;
