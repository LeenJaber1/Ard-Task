import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherApiService {
  private readonly apiKey: string;
  private readonly weatherUrl = 'http://api.weatherapi.com/v1/forecast.json';
  private readonly autoCompleteUrl = 'http://api.weatherapi.com/v1/search.json';
  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('WEATHER_KEY')!;
  }

  async getWeatherInfo(location: string) {
    const response = await axios.get(this.weatherUrl, {
      params: {
        q: location,
        key: this.apiKey,
        days: 6,
      },
    });
    // disabled because most of the data in the response is not needed and will be formatted into other interfaces
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }

  async getAutoComplete(location: string) {
    const response = await axios.get(this.autoCompleteUrl, {
      params: {
        q: location,
        key: this.apiKey,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }
}
