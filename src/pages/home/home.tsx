import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppBar, Drawer, Toolbar, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import axiosInstance from "api/axios-instance";
import {
  addStartingPointCoordinates,
  addDestinationPointCoordinates,
  addStartingCity,
  addDestinationCity,
} from "features/coordinatesSlice";
import { addRecentTravelSearches } from "features/travelDetailsSlice";

import { RootState } from "redux-setup/store";
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
  const startingCity = useSelector(
    (state: RootState) => state.coordinates.startingCity
  );

  const destinationCity = useSelector(
    (state: RootState) => state.coordinates.destinationCity
  );
  const recentTravelSearches = useSelector(
    (state: RootState) => state.travelDetails.recentTravelSearches
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
      dispatch(addRecentTravelSearches({ startingCity, destinationCity }));
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

  const Item = styled(Paper)(() => ({
    backgroundColor: "#f0f1f2",
    padding: "15px",
    textAlign: "center",
    color: "#1A2027",
    fontWeight: "200",
  }));

  return (
    <div>
      <Box className={styles["box"]} sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Home
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={styles["home-wrapper"]}>
        <Drawer
          sx={{
            width: "300px",
            flexShrink: 0,
            backgroundColor: "#f0f1f2",
            zIndex: 0,
            marginTop: '200px',
            "& .MuiDrawer-paper": {
              marginTop:'64px',
              width: "300px",
              backgroundColor: "#f0f1f2",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
              {recentTravelSearches.length > 0 ? (
                <>
                  <p className={styles["previous-searched-travels-text"]}>
                    Your previous searched travels:
                  </p>
                  {recentTravelSearches.map((trip) => (
                    <>
                      <Item>From: {trip.startingCity}</Item>
                      <Item>To: {trip.destinationCity}</Item>
                    </>
                  ))}
                </>
              ) : (
                <p className={styles["previous-searched-travels-text"]}>
                  Your previous searched travels:
                </p>
              )}
            </Stack>
          </Box>
        </Drawer>

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
                onChange={(event, value) =>
                  handleDestinationPointChoosing(value)
                }
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
              disabled={
                startingPointValue === "" || destinationPointValue === ""
              }
              onClick={handleTravelSearching}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
