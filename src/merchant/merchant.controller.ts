import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/SignUpDto';
import { MerchantService } from './merchant.service';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}
  @Post('/sign_up')
  handleSignUp(@Body() signUpDto: SignUpDto) {
    return this.merchantService.signUp(signUpDto);
  }
}
