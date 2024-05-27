import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StartPaymentDto } from './dto/StartPaymentDto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: '2024-04-10',
    });
  }

  async startPayment(startPaymentDto: StartPaymentDto) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: startPaymentDto.currency,
            unit_amount: startPaymentDto.amount,
            product_data: {
              name: 'test product',
            },
          },
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      success_url: 'https://google.com',
      cancel_url: 'https://google.com',
    });
    return session;
  }
}
