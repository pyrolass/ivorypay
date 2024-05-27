import { IsEmail, IsString } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  merchant_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignUpResponseDto {
  @IsString()
  merchant_name: string;

  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
