import { Injectable, NotFoundException } from '@nestjs/common';
import { autoCompleteResponse } from 'src/interfaces/autocomplete-interface';
import { WeatherApiResponse } from 'src/interfaces/weather-api-response-interface';
import {
  CurrentWeather,
  LocationInfo,
  WeatherResponse,
  DailyForecast,
  HourlyForecast,
} from 'src/response/weather.response';
import { WeatherApiService } from 'src/weather-api/weather-api.service';

@Injectable()
export class WeatherService {
  constructor(private weatherApiService: WeatherApiService) {}

  async getWeatherByCity(city: string) {
    const weather = (await this.weatherApiService.getWeatherInfo(
      city,
    )) as WeatherApiResponse;
    return this.formatResponse(weather);
  }

  async getAutoCompleteCities(location: string) {
    const cities = (await this.weatherApiService.getAutoComplete(
      location,
    )) as autoCompleteResponse[];
    return cities;
  }

  private formatResponse(response: WeatherApiResponse): WeatherResponse {
    return {
      location: this.getLocationInfo(response),
      current: this.getCurrentWeather(response),
      forecast: {
        daily: this.getDailyForecast(response),
        hourly: this.getHourlyForecast(response),
      },
    };
  }

  private getLocationInfo(response: WeatherApiResponse): LocationInfo {
    if (!response?.location) {
      throw new NotFoundException(
        'Missing current location information in response',
      );
    }
    return {
      name: response.location.name,
      country: response.location.country,
      localTime: response.location.localtime,
    };
  }

  private getCurrentWeather(response: WeatherApiResponse): CurrentWeather {
    if (!response?.current) {
      throw new NotFoundException('Missing current weather in response');
    }

    if (!response?.forecast?.forecastday?.[0]?.astro) {
      throw new NotFoundException('Missing current weather  in response');
    }

    const current = response.current;
    const astro = response.forecast.forecastday[0].astro;

    return {
      temperature: current.temp_c,
      feelsLike: current.feelslike_c,
      condition: current.condition.text,
      humidity: current.humidity,
      uv: current.uv,
      pressure: current.pressure_mb,
      windSpeed: current.wind_kph,
      sunset: astro.sunset,
      sunrise: astro.sunrise,
    };
  }

  private getDailyForecast(response: WeatherApiResponse): DailyForecast[] {
    if (!response?.forecast?.forecastday) {
      throw new NotFoundException('Missing daily forecast in response');
    }
    // the response returns the current day + 5 days
    return response.forecast.forecastday.slice(1).map((day) => ({
      date: day.date,
      maxTemp: day.day.maxtemp_c,
      condition: day.day.condition.text,
    }));
  }

  private getHourlyForecast(response: WeatherApiResponse): HourlyForecast[] {
    const targetHours = ['00:00', '12:00', '15:00', '18:00', '21:00'];
    if (!response?.forecast?.forecastday?.[0]?.hour) {
      throw new NotFoundException('Missing hourly forecast in response');
    }
    return (
      response.forecast.forecastday[0].hour
        //take only the hours that are needed
        .filter((hour) => {
          const time = hour.time.split(' ')[1];
          return targetHours.includes(time);
        })
        //transform each one left to an hourly forecast object
        .map((hour) => ({
          time: hour.time.split(' ')[1],
          temperature: hour.temp_c,
          condition: hour.condition.text,
          windSpeed: hour.wind_kph,
          windDirection: hour.wind_dir,
        }))
    );
  }
}
