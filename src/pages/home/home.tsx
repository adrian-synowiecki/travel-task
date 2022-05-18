import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import axiosInstance from "api/axios-instance";
import {
  addStartingPointCoordinates,
  addDestinationPointCoordinates,
  addStartingCity,
  addDestinationCity,
} from "features/coordinatesSlice";
import { RootState } from "store";
import { TravelPoint } from "TravelPoint";

import styles from "./home.module.scss";

const Home = () => {
  let navigate = useNavigate();
  const [listOfStartingPoints, setListOfStartingPoints] = useState([]);
  const [startingPointValue, setStartingPointValue] = useState("");

  const [listOfDestinationPoints, setListOfDestinationPoints] = useState([]);
  const [destinationPointValue, setDestinationPointValue] = useState("");

  const [invalidPlaceNameError, setInvalidPlaceNameError] = useState("");
  const [serviceUnavailableError, setServiceUnavailableError] = useState("");

  const startingPointCoordinates = useSelector(
    (state: RootState) => state.coordinates.startingPointCoordinates
  );
  const destinationPointCoordinates = useSelector(
    (state: RootState) => state.coordinates.destinationPointCoordinates
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const checkServiceAvailability = async () => {
      try {
        await axiosInstance.get(
          `/geocode/autocomplete?text=Warszawa&format=json&apiKey=${process.env.REACT_APP_API_KEY}`
        );
      } catch (err) {
        const error = err as { response: { status: number } };
        if (
          error.response.status === 401 ||
          error.response.status === 400 ||
          error.response.status === 500
        ) {
          setServiceUnavailableError(
            "Our services are not available at the moment, please try again later"
          );
        }
      }
    };

    checkServiceAvailability();
  }, []);

  useEffect(() => {
    if (startingPointValue !== "" && !serviceUnavailableError) {
      const fetchStartingPointCoordinates = async () => {
        const response = await axiosInstance.get(
          `/geocode/autocomplete?text=${startingPointValue}&format=json&apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const transformedListOfStartingPoints = response.data.results.map(
          (point: TravelPoint) => ({
            label: point.formatted,
            lon: point.lon,
            lat: point.lat,
            city: point.city,
          })
        );

        setListOfStartingPoints(transformedListOfStartingPoints);
      };
      fetchStartingPointCoordinates();
    }
  }, [serviceUnavailableError, startingPointValue]);

  useEffect(() => {
    if (destinationPointValue !== "" && !serviceUnavailableError) {
      const fetchDestinationPointCoordinates = async () => {
        const response = await axiosInstance.get(
          `/geocode/autocomplete?text=${destinationPointValue}&format=json&apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const transformedListOfDestinationPoints = response.data.results.map(
          (point: TravelPoint) => ({
            label: point.formatted,
            lon: point.lon,
            lat: point.lat,
            city: point.city,
          })
        );

        setListOfDestinationPoints(transformedListOfDestinationPoints);
      };
      fetchDestinationPointCoordinates();
    }
  }, [destinationPointValue, serviceUnavailableError]);

  const handleTravelSearching = () => {
    if (
      startingPointCoordinates.length === 0 ||
      destinationPointCoordinates.length === 0
    ) {
      setInvalidPlaceNameError("Invalid place name, please try another one.");
    } else {
      navigate("/travel-details");
    }
  };

  // value has to be any until materiaul ui fixes it types
  const handleStartingPointChoosing = (value: any) => {
    dispatch(addStartingPointCoordinates([value.lat, value.lon]));
    dispatch(addStartingCity(value.label));
  };

  // value has to be any until materiaul ui fixes it types
  const handleDestinationPointChoosing = (value: any) => {
    dispatch(addDestinationPointCoordinates([value.lat, value.lon]));
    dispatch(addDestinationCity(value.label));
  };

  return (
    <div className={styles["home-container"]}>
      <div className={styles["flex-wrapper"]}>
        {invalidPlaceNameError && !serviceUnavailableError && (
          <Alert severity="error" style={{ marginRight: "100px" }}>
            {invalidPlaceNameError}
          </Alert>
        )}
        {serviceUnavailableError && (
          <Alert severity="error" style={{ marginRight: "100px" }}>
            {serviceUnavailableError}
          </Alert>
        )}
        <div className={styles["autocomplete-wrapper"]}>
          <div className={styles["starting-point"]}>
            <Autocomplete
              disablePortal
              className={styles["autocomplete"]}
              freeSolo={true}
              id="combo-box-demo"
              options={listOfStartingPoints}
              onChange={(event, value) => handleStartingPointChoosing(value)}
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  onChange={(event) =>
                    setStartingPointValue(event.target.value)
                  }
                  {...params}
                  label="Choose a starting point"
                />
              )}
            />
          </div>
          <div className={styles["destination-point"]}>
            <Autocomplete
              disablePortal
              className={styles["autocomplete"]}
              freeSolo={true}
              id="combo-box-demo"
              options={listOfDestinationPoints}
              onChange={(event, value) => handleDestinationPointChoosing(value)}
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  onChange={(event) =>
                    setDestinationPointValue(event.target.value)
                  }
                  {...params}
                  label="Choose a destination point"
                />
              )}
            />
          </div>
          <Button
            variant="contained"
            disabled={startingPointValue === "" || destinationPointValue === ""}
            onClick={handleTravelSearching}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
