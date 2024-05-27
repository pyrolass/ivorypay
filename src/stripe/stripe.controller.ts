import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StartPaymentDto } from './dto/StartPaymentDto';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('/start_payment')
  async handleStartPayment(@Body() startPaymentDto: StartPaymentDto) {
    try {
      const res = await this.stripeService.startPayment(startPaymentDto);

      return res;
    } catch (e) {
      throw e;
    }
  }
}
