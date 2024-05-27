import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StartPaymentDto } from './dto/StartPaymentDto';
import { AuthGuard } from 'src/guard/auth.guard';
import { TransactionService } from 'src/transaction/transaction.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private readonly transactionService: TransactionService,
  ) {}

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
    console.log(body.data.object.id);

    await this.transactionService.completeTransaction(body.data.object.id);

    return {
      message: 'success',
    };
  }
  @Post('/payment_failed')
  async handlePaymentFailed(@Body() body) {
    await this.transactionService.failTransaction(body.data.object.id);
    return {
      message: 'success',
    };
  }

  @Post('/payment_expired')
  async handlePaymentExpired(@Body() body) {
    await this.transactionService.expireTransaction(body.data.object.id);
    return {
      message: 'success',
    };
  }
}
