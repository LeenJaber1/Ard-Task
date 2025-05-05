import React from "react";
import { Box, Typography } from "@mui/material";
import { getIcon, mapConditionToIcon } from "../utils/IconUtil";
const HourlyForecast = ({ weatherResponse, palette, isLight }) => {
  const hours = weatherResponse?.forecast?.hourly || [];
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 120, 
        borderRadius: 7,
        textAlign: "center",
        background: palette.background.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch", 
        width: "100%",
        height : "100%"
      }}
    >
      <Typography
        variant="h4"
        fontWeight="600"
        mb={3}
        sx={{ textAlign: "center", color:  palette.text.primary}}
      >
        Hourly Forecast
      </Typography>

      <Box
        sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            flex: 1,
          }}
      >
        {hours.map((hour) => {
          const hourNumber = parseInt(hour.time.split(":")[0]);
          const isDay = hourNumber >= 6 && hourNumber < 18;
          const bgGradient = isDay
            ? palette.custom.hourlyDayForecast
            : palette.custom.hourlyNightForecast;

          return (
            <Box
            sx={{
                flex: 1,                     
                minWidth: 120,              
                borderRadius: 7,
                padding: 2,
                textAlign: "center",
                background: bgGradient,
                display: "stretch",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "center",
              }}
            >
              <Typography fontWeight={600} fontSize="2rem" sx={{color: palette.text.primary}}>
                {hour.time}
              </Typography>
              <img
                src={getIcon(mapConditionToIcon(hour.condition, isDay), isLight)}
                alt={hour.condition}
                width={100}
                style={{ margin: "6px 0" }}
              />
              <Typography fontSize="2rem" sx={{color: palette.text.primary}}>
                {Math.round(hour.temperature)}°C
              </Typography>
              <Typography fontSize="2rem" sx={{color: palette.text.primary}}>
                {Math.round(hour.windSpeed)}km/h
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default HourlyForecast;
