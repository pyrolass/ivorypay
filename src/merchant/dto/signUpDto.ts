import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  merchant_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
