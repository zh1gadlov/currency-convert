import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
    CurrencyModule
  ],
  exports: []
})
export class RestModule {}
