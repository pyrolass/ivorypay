import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StartPaymentDto } from './dto/StartPaymentDto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('/start_payment')
  @UseGuards(AuthGuard)
  async handleStartPayment(
    @Body() startPaymentDto: StartPaymentDto,
    @Request() req,
  ) {
    try {
      const { user_id } = req.user;

      const res = await this.stripeService.startPayment(
        startPaymentDto,
        user_id,
      );

      return res;
    } catch (e) {
      throw e;
    }
  }

  @Post('/payment_completed')
  async handlePaymentCompleted(@Body() body) {
    console.log(body);
    return {
      message: 'success',
    };
  }
  @Post('/payment_failed')
  async handlePaymentFailed(@Body() body) {
    console.log(body);
    return {
      message: 'success',
    };
  }

  @Post('/payment_expired')
  async handlePaymentExpired(@Body() body) {
    console.log(body);
    return {
      message: 'success',
    };
  }
}
