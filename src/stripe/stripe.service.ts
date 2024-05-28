import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StartPaymentDto } from './dto/StartPaymentDto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TransactionService } from 'src/transaction/transaction.service';
import { Types } from 'mongoose';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly httpService: HttpService,
    private readonly transactionService: TransactionService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: '2024-04-10',
    });
  }

  async startPayment(startPaymentDto: StartPaymentDto, user_id: string) {
    try {
      const amountInUSD = await this.getCryptoPrice(startPaymentDto.currency);

      const amount = Math.round(amountInUSD * startPaymentDto.amount) * 100;

      const session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'USD',
              unit_amount: amount,
              product_data: {
                name: `${startPaymentDto.amount}X ${startPaymentDto.currency}`,
              },
            },

            quantity: 1,
          },
        ],
        payment_method_types: ['card'],
        success_url: 'https://google.com',
        cancel_url: 'https://google.com',
      });

      await this.transactionService.createTransaction({
        stripe_id: session.id.toString(),
        merchant_id: new Types.ObjectId(user_id),
        amount: amount,
        currency: startPaymentDto.currency,
      });
      return { url: session.url };
    } catch (e) {
      throw e;
    }
  }

  private async getCryptoPrice(cryptoType: string) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoType}&vs_currencies=USD`;
    try {
      const response = this.httpService.get(url);
      const data = await firstValueFrom(response);

      return data.data[cryptoType.toLowerCase()]['usd'];
    } catch (error) {
      throw new Error('Failed to fetch cryptocurrency rates');
    }
  }
}
