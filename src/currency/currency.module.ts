import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  controllers: [CurrencyController],
  imports: [StripeModule],
})
export class CurrencyModule {}
