import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signUpDto';

@Controller('merchant')
export class MerchantController {
  @Post('/sign_up')
  signUp(@Body() signUpDto: SignUpDto) {
    return signUpDto;
  }
}
