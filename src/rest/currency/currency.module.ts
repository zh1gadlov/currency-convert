import { Module } from '@nestjs/common';
import { ExchangeRateServiceThai } from '../../exchange-rate-api/thai/exchange-rate-api-thai.service';

import { CurrencyConversionController } from './currency-conversion.controller';
import { ExchangeRateController } from './exchange-rate.controller';

import { CurrencyService } from './currency.service'

@Module({
  imports: [],
  providers: [
    ExchangeRateServiceThai,
    CurrencyService
  ],
  controllers: [
    CurrencyConversionController,
    ExchangeRateController
  ]
})
export class CurrencyModule {}
