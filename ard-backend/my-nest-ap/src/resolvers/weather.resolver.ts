import { Args, Resolver, Query } from '@nestjs/graphql';
import { WeatherService } from 'src/weather/weather.service';
import { WeatherResponse } from 'src/response/weather.response';
import { BadRequestException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/graphql.guard';

@UseGuards(GqlAuthGuard)
@Resolver()
export class WeatherResolver {
  constructor(private weatherService: WeatherService) {}

  @Query(() => WeatherResponse)
  async getWeatherDetails(
    @Args('city', { nullable: true }) city: string,
  ): Promise<WeatherResponse> {
    if (city) {
      return this.weatherService.getWeatherByCity(city);
    }
    throw new BadRequestException('must specify location');
  }
}
