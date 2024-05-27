import { IsEmail, IsString } from 'class-validator';

export class SignInRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignInResponseDto {
  @IsString()
  merchant_name: string;

  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
