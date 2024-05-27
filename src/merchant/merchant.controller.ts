import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequestDto } from './dto/SignUpDto';
import { MerchantService } from './merchant.service';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}
  @Post('/sign_up')
  handleSignUp(@Body() signUpRequestDto: SignUpRequestDto) {
    try {
      return this.merchantService.signUp(signUpRequestDto);
    } catch (e) {
      throw e;
    }
  }
}
