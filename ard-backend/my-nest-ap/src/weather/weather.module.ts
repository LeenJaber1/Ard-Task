import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherApiService } from 'src/weather-api/weather-api.service';
import { WeatherResolver } from 'src/resolvers/weather.resolver';
import { WeatherController } from './weather.controller';

@Module({
  providers: [WeatherService, WeatherApiService, WeatherResolver],
  exports: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
