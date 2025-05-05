import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocationInfo {
  @Field() name: string;
  @Field() country: string;
  @Field() localTime: string;
}

@ObjectType()
export class CurrentWeather {
  @Field() temperature: number;
  @Field() feelsLike: number;
  @Field() condition: string;
  @Field() humidity: number;
  @Field() uv: number;
  @Field() pressure: number;
  @Field() windSpeed: number;
  @Field() sunset: string;
  @Field() sunrise: string;
}

@ObjectType()
export class DailyForecast {
  @Field() date: string;
  @Field() maxTemp: number;
  @Field() condition: string;
}

@ObjectType()
export class HourlyForecast {
  @Field() time: string;
  @Field() temperature: number;
  @Field() condition: string;
  @Field() windSpeed: number;
  @Field() windDirection: string;
}

@ObjectType()
export class Forecast {
  @Field(() => [DailyForecast]) daily: DailyForecast[];
  @Field(() => [HourlyForecast]) hourly: HourlyForecast[];
}

@ObjectType()
export class WeatherResponse {
  @Field(() => LocationInfo) location: LocationInfo;
  @Field(() => CurrentWeather) current: CurrentWeather;
  @Field(() => Forecast) forecast: Forecast;
}
