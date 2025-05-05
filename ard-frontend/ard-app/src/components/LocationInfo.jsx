import { Box, Typography } from "@mui/material";

const LocationInfo = ({ weatherResponse, theme, isLight }) => {
  const location = weatherResponse?.location;
  if (!location) return null;

  const date = new Date(location.localTime);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const fullDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <Box
      sx={{
        backgroundColor: theme.background.paper,
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"           
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{color: theme.text.primary}}>
        {location.name}
      </Typography>
      <Typography variant="h3" fontWeight="600" sx={{color: theme.text.primary}}>
        {time}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{color: theme.text.primary}}>
        {fullDate}
      </Typography>
    </Box>
  );
};

export default LocationInfo;
