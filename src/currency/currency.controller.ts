import { Controller, Get, Query } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';
import { CurrencyRateDto } from './dto/CurrencyRateDto';

@Controller('currency')
export class CurrencyController {
  constructor(private stripeService: StripeService) {}
  @Get('/get_crypto_rate')
  async getCryptoCurrencyRate(@Query() currencyRateDto: CurrencyRateDto) {
    try {
      const price = await this.stripeService.getCryptoPrice(
        currencyRateDto.currency,
      );

      return {
        currency: currencyRateDto.currency,
        price: `${price} USD`,
      };
    } catch (e) {
      throw e;
    }
  }
}
