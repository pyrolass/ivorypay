import { IsIn } from 'class-validator';

export class CurrencyRateDto {
  @IsIn(['bitcoin', 'ethereum'])
  currency: string;
}
