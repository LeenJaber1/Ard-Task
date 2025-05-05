import { Module } from '@nestjs/common';
import { WeatherApiService } from './weather-api.service';

// speaks with the api
@Module({
  providers: [WeatherApiService],
  exports: [WeatherApiService],
})
export class WeatherApiModule {}
