import { IsNumber, IsString } from 'class-validator';

export class GetMerchantDto {
  @IsString()
  merchant_name: string;

  @IsString()
  merchant_email: string;

  @IsNumber()
  merchant_balance: number;
}
