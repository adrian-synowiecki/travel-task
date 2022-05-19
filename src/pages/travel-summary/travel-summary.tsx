import { PDFExport } from "@progress/kendo-react-pdf";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion } from "framer-motion";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import { useSelector } from "react-redux";
import { RootState } from "redux-setup/store";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Item = styled(Paper)(() => ({
  backgroundColor: "#f0f1f2",
  padding: "15px",
  textAlign: "center",
  color: "#1A2027",
  fontWeight: "200",
}));

const TravelSummary = () => {
  const pdfExportComponent = useRef<PDFExport>(null);

  const startingCity = useSelector(
    (state: RootState) => state.coordinates.startingCity
  );
  const destinationCity = useSelector(
    (state: RootState) => state.coordinates.destinationCity
  );

  const travelCost = useSelector(
    (state: RootState) => state.travelDetails.travelCost
  );
  const travelTime = useSelector(
    (state: RootState) => state.travelDetails.travelTime
  );
  const distance = useSelector(
    (state: RootState) => state.coordinates.distance
  );

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const summaryList = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const summaryItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Home
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PDFExport
            fileName="travel-summary.pdf"
            ref={pdfExportComponent}
            paperSize="A4"
          >
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                variants={summaryList}
                initial="hidden"
                animate="show"
                component={motion.ul}
              >
                <motion.li variants={summaryItem}>
                  <Item>
                    From: {startingCity}, To: {destinationCity}
                  </Item>
                </motion.li>
                <motion.li variants={summaryItem}>
                  <Item>Travel cost: {travelCost.toFixed(2)}</Item>
                </motion.li>
                <motion.li variants={summaryItem}>
                  <Item>
                    You will reach your destination within:{" "}
                    {travelTime === 1
                      ? `${travelTime} day`
                      : `${travelTime} days`}
                  </Item>
                </motion.li>
                <motion.li variants={summaryItem}>
                  <Item>Distance: {Math.trunc(distance)} km</Item>
                </motion.li>
              </Stack>
            </Box>
          </PDFExport>
          <Button
            style={{ marginTop: "20px" }}
            onClick={exportPDFWithComponent}
            variant="contained"
          >
            EXPORT A REPORT TO PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TravelSummary;
