import React from "react";
import { Box, Button } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const CurrentLocationButton = ({ getCurrentGeoLocation, theme}) => {
  return (
    <Box  sx={{
      mt: 4,
      display: "flex",
      justifyContent: { xs: "flex-end", sm: "flex-end", md: "flex-start" },
    }}>
    <Button
      onClick={getCurrentGeoLocation}
      variant="contained"
      startIcon={<MyLocationIcon />}
      sx={{
        backgroundColor: theme.button.background,
        fontSize: "0.75rem",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "25px",
        height: "50px",
        px: 2,
        py: 1,
        "&:hover": {
          backgroundColor: theme.button.hover,
        },
      }}
    >
      Current Location
    </Button></Box>
  );
};

export default CurrentLocationButton;
