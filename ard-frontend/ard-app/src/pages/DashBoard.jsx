import { useEffect, useState } from "react";
import axios from "axios";
import query from "../utils/WeatherQueryUtil";
import {  useNavigate } from "react-router-dom";
import { lightPalette } from "../theme/palette/LightPalette";
import { darkPalette } from "../theme/palette/DarkPalette";
import { Grid, Box, Typography, Stack, IconButton } from "@mui/material";
import CurrentWeather from "../components/CurrentWeather";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";
import LocationInfo from "../components/LocationInfo";
import { DarkMode, LightMode, Logout } from "@mui/icons-material";
import SearchBar from "../components/SearchBar";
import CurrentLocationButton from "../components/CurrentLocationButton";
import { fetchWithRefresh } from "../utils/ApiUtil";

const Dashboard = () => {
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [weatherResponse, setWeatherResponse] = useState("");
  const [isLight, setIsLight] = useState(true);
  const [theme, setTheme] = useState(lightPalette);
  const [isDay, setIsDay] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/auth/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  const getCurrentGeoLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        updateUserLocation(`${lat},${lng}`);
        setCity(`${lat},${lng}`);
      },
      (geoErr) => {
        setError("Unable to retrieve your location: " + geoErr.message);
      }
    );
  };

  const isDayTime = (timeStr) => {
    const [hourStr] = timeStr.split(":");
    const hour = parseInt(hourStr, 10);

    return hour >= 6 && hour < 18;
  };

  const toggleTheme = () => {
    const nextTheme = !isLight;
    setTheme(nextTheme ? lightPalette : darkPalette);
    setIsLight(nextTheme);
  };

  const updateUserLocation = async (location) => {
    try {
      const url = "http://localhost:8080/user/update-location";
      await fetchWithRefresh(() =>
        axios.put(
          url,
          {
            location: location,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
      );
    } catch (err) {
      setError(
        "Error updating location: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (city) {
        console.log(city);
        return;
      }
      try {
        const url = `http://localhost:8080/user/location`;
        const response = await fetchWithRefresh(() =>
          axios.get(url, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
          })
        );
        setCity(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          getCurrentGeoLocation();
        } else {
          setError(
            "Error fetching location: " +
              (err.response?.data?.message || err.message)
          );
        }
      }
    };

    fetchLocation();
  });

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      const variables = { city: city };
      try {
        const response = await fetchWithRefresh(() =>
          axios.post(
            "http://localhost:8080/graphql",
            {
              query,
              variables,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          )
        );
        setIsDay(
          isDayTime(response.data.data.getWeatherDetails?.location.localTime)
        );
        setWeatherResponse(response.data.data.getWeatherDetails);
      } catch (error) {
        console.error("GraphQL Error:", error.response?.data || error.message);
        throw error;
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <Box
      sx={{
        background: theme.custom.gradientBackground,
        minHeight: "100vh",
        width: "100%",
        padding: 4,
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {weatherResponse ? (
        <>
          <Grid
            container
            spacing={10}
            justifyContent="center"
            alignItems="stretch"
            height="100%"
          >
            <Grid size={{ md: 12, xs: 12 }}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                display="flex"
              >
                <IconButton onClick={toggleTheme}>
                  {isLight ? (
                    <DarkMode sx={{ fontSize: 48, mt: 4 }} />
                  ) : (
                    <LightMode sx={{ fontSize: 48, mt: 4 }} />
                  )}
                </IconButton>

                <SearchBar
                  setCity={setCity}
                  updateUserLocation={updateUserLocation}
                ></SearchBar>

                <CurrentLocationButton
                  getCurrentGeoLocation={getCurrentGeoLocation}
                  theme={theme}
                ></CurrentLocationButton>

                <IconButton
                  color={theme.button.background}
                  onClick={handleLogout}
                  sx={{ mt: 4 }}
                >
                  <Logout sx={{ fontSize: 48 }} />
                </IconButton>
              </Stack>
            </Grid>
            <Grid size={{ md: 5, xs: 12 }} height="auto">
              <Box
                sx={{
                  backgroundColor: theme.background.paper,
                  borderRadius: 5,
                  padding: 1,
                  height: "100%",
                }}
              >
                <LocationInfo
                  weatherResponse={weatherResponse}
                  theme={theme}
                  isLight={isLight}
                />
              </Box>
            </Grid>
            <Grid size={{ md: 7, xs: 12 }}>
              <Box
                sx={{
                  backgroundColor: theme.background.paper,
                  borderRadius: 5,
                  padding: 2,
                  height: "100%",
                }}
              >
                <CurrentWeather
                  weatherResponse={weatherResponse}
                  theme={theme}
                  isLight={isLight}
                  isDay={isDay}
                />
              </Box>
            </Grid>

            <Grid size={{ md: 4, xs: 12 }}>
              <Box
                sx={{
                  backgroundColor: theme.background.paper,
                  borderRadius: 5,
                  padding: 1,
                  height: "100%",
                }}
              >
                <DailyForecast
                  weatherResponse={weatherResponse}
                  theme={theme}
                  isLight={isLight}
                />
              </Box>
            </Grid>

            <Grid size={{ md: 8, xs: 12 }}>
              <Box
                sx={{
                  backgroundColor: theme.background.paper,
                  borderRadius: 5,
                  padding: 5,
                  height: "85%",
                }}
              >
                <HourlyForecast
                  weatherResponse={weatherResponse}
                  palette={theme}
                  isLight={isLight}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6" color="text.primary">
          Loading weather data...
        </Typography>
      )}
    </Box>
  );
};
export default Dashboard;
