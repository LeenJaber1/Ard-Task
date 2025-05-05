import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('complete')
  async getAutoCompleteCities(@Query('input') input: string) {
    return this.weatherService.getAutoCompleteCities(input);
  }
}
