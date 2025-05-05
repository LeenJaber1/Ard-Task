export interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    condition: {
      text: string;
    };
    humidity: number;
    uv: number;
    pressure_mb: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        condition: {
          text: string;
        };
      };
      astro: {
        sunset: string;
        sunrise: string;
      };
      hour: {
        time: string;
        temp_c: number;
        condition: {
          text: string;
        };
        wind_kph: number;
        wind_dir: string;
      }[];
    }[];
  };
}
