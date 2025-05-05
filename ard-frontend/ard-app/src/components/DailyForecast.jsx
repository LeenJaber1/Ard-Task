import React from "react";
import { Box, Typography } from "@mui/material";
import { getIcon, mapConditionToIcon } from "../utils/IconUtil";
const DailyForecast = ({ weatherResponse, theme ,isLight }) => {

  return (
    <Box
      sx={{
        background: theme.background.paper,
        borderRadius: 5,
        padding: 1,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="600"
        fontSize="1.5rem" 
        mb={3}
        sx={{ textAlign: "center" , color: theme.text.primary }}
      >
        5 Days Forecast
      </Typography>

      {weatherResponse.forecast.daily.map((day, idx) => {
        const icon = getIcon(mapConditionToIcon(day.condition), isLight);
        const date = new Date(day.date);
        const weekday = date.toLocaleDateString(undefined, { weekday: "long" });
        const dateFormatted = date.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
        });

        return (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              px: 2,
              backgroundColor: theme.background.paper
            }}
          >
            <Box width="40px" textAlign="center">
              <img src={icon} alt={day.condition} width={60} />
            </Box>

            <Typography fontSize="1.5rem"  fontWeight="600" width="60px" sx={{color: theme.text.primary}}>
              {day.maxTemp}°C
            </Typography>

            <Typography fontSize="1.1rem"  textAlign="left" width="160px" noWrap sx={{color: theme.text.primary}}>
              {weekday}, {dateFormatted}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default DailyForecast;