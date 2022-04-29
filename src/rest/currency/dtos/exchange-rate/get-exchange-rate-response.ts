import { ApiModelProperty } from '@nestjs/swagger';
import { ExchangeType } from '../../../../exchange-rate-api/exchange-rate-model';

export class CurrencyExchangeRate {
  @ApiModelProperty()
  cource: number;

  @ApiModelProperty()
  baseCurrency: string;

  @ApiModelProperty()
  targetCurrency: string;

  @ApiModelProperty()
  type: ExchangeType;
}


export class GetExchangeRateResponse {
  @ApiModelProperty({type: [CurrencyExchangeRate]})
  data: CurrencyExchangeRate[];
}
