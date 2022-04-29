import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetExchangeRateQuery {
  @ApiModelProperty({ default: "TH" })
  @IsString()
  country: string;
}
