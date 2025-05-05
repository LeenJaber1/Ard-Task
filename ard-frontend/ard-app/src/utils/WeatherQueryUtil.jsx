const query  = `
query GetWeather($city: String) {
  getWeatherDetails(city: $city) {
    location {
      name
      country
      localTime
    }
    current {
      temperature
      feelsLike
      condition
      humidity
      uv
      pressure
      windSpeed
      sunset
      sunrise
    }
    forecast {
      daily {
        date
        maxTemp
        condition
      }
      hourly {
        time
        temperature
        condition
        windSpeed
        windDirection
      }
    }
  }
}
`;

export default query;