import { IsNumber, IsString, IsIn } from 'class-validator';

export class StartPaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsIn(['USD', 'EUR'])
  currency: string;
}
