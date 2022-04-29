import { Injectable, Inject, Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '../../authentication/auth.guard';
import { ConfigService } from '../../config.service';
import { GetExchangeRateQuery } from './dtos/exchange-rate/get-exchange-rate-request';
import { CurrencyService } from './currency.service';
import { GetExchangeRateResponse } from './dtos/exchange-rate/get-exchange-rate-response';

@ApiUseTags('exchange-rate')
@Controller('exchange-rate')
@UseGuards(AuthGuard)
@Injectable()
export class ExchangeRateController {
  constructor(
      @Inject(ConfigService)
      private readonly configService: ConfigService,

      @Inject(CurrencyService)
      private readonly currencyService: CurrencyService,
      ) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description:
      'В ответе получаем массив курсов обмена',
    type: GetExchangeRateResponse
  })
  async getExchangeRate(
    @Query() query: GetExchangeRateQuery
  ){
    const exchangeRate = await this.currencyService.getExchangeRate(query);

    return { data: exchangeRate };
  }
}
