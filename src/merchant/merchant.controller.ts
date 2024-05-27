import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { MerchantService } from './merchant.service';

@Controller('merchant')
export class MerchantController {
  constructor(private merchantService: MerchantService) {}

  @Get()
  @UseGuards(AuthGuard)
  handleGetMerchantInfo(@Request() req) {
    try {
      const { user_id } = req.user;
      const merchant = this.merchantService.getMerchantInfo(user_id);

      return merchant;
    } catch (e) {
      throw e;
    }
  }
}
