import { Injectable, Inject, Controller, UseGuards, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '../../authentication/auth.guard';
import { ConfigService } from '../../config.service';
import { ConvertQuery } from './dtos/convert/convert-request';
import { CurrencyService } from './currency.service';
import { CurrencyConvertResponse } from './dtos/convert/currency-convert-response';

@ApiUseTags('currency-conversion')
@Controller('currency-conversion')
@UseGuards(AuthGuard)
@Injectable()
export class CurrencyConversionController {
  constructor(    
      @Inject(ConfigService)
      private readonly configService: ConfigService,

      @Inject(CurrencyService)
      private readonly currencyService: CurrencyService,
      ) { }

  @Post('/')
  @ApiResponse({
    status: 200,
    description:
      'В ответе получаем массив курсов обмена',
    type: CurrencyConvertResponse
  })
  async convert(
    @Query() query: ConvertQuery
  ){
    const result = await this.currencyService.currencyConvert(query);
    
    return { data: result };
  }
}
