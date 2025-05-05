import { Box, Typography } from "@mui/material";
import { getIcon , mapConditionToIcon} from "../utils/IconUtil";

const CurrentWeather = ({ weatherResponse, theme, isLight, isDay }) => {
  const {
    temperature,
    feelsLike,
    condition,
    humidity,
    uv,
    windSpeed,
    pressure,
    sunrise,
    sunset,
  } = weatherResponse.current;

  return (
    <Box
      sx={{
        backgroundColor: theme.background.paper,
        borderRadius: 5,
        padding: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3,
        overflowX: { xs: "auto", md: "visible" }, 
        flexWrap: "nowrap",
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700 ,  color: theme.text.primary}}>
          {temperature}°C
        </Typography>
        <Typography fontSize="1.7rem" sx={{ color: theme.text.primary}}>
          Feels like: <strong>{feelsLike}°C</strong>
        </Typography>
        <Box mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <img src={getIcon( "sunrise.png", isLight )} alt="Sunrise" width={24} />
            <Typography fontSize="1.5rem"  sx={{ color: theme.text.primary}}>
              <strong>Sunrise</strong> {sunrise}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <img src={getIcon( "sunset.png", isLight)} alt="Sunset" width={24} />
            <Typography fontSize="1.5rem"  sx={{ color: theme.text.primary}} >
              <strong>Sunset</strong> {sunset}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box textAlign="center">
        <img
          src={getIcon(mapConditionToIcon(condition) , isLight , isDay)}
          alt={condition}
          width={200}
        />
        <Typography variant="h6" fontSize="1.5rem" sx={{ mt: 1, fontWeight: 600 ,  color: theme.text.primary}}>
          {condition}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={getIcon("humidity.png" , isLight )} alt="Humidity" width={60} />
          <Typography fontSize="1.5rem" sx={{ color: theme.text.primary}}>{humidity}%</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={getIcon("wind.png", isLight)} alt="Wind Speed" width={60} />
          <Typography fontSize="1.5rem" sx={{ color: theme.text.primary}}>{windSpeed} km/h</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={getIcon("pressure.png", isLight)} alt="Pressure" width={60} />
          <Typography fontSize="1.5rem" sx={{ color: theme.text.primary}}>{pressure} hPa</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <img src={getIcon("uv.png", isLight)} alt="UV Index" width={60} />
          <Typography fontSize="1.5rem" sx={{ color: theme.text.primary}}>UV: {uv}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentWeather;
