import { ApiModelProperty } from '@nestjs/swagger';


export class CurrencyConvertResponse {
  @ApiModelProperty()
  data: number;
}
