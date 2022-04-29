import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ConvertQuery {
  @ApiModelProperty({ default: 'TH'})
  @IsString()
  country: string;

  @ApiModelProperty()
  @IsString()
  baseCurrency: string;

  @ApiModelProperty()
  @IsString()
  targetCurrency: string;

  @ApiModelProperty()
  @Type(() => Number)
  @IsNumber()
  value: number;
}
