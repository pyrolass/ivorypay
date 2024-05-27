import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [ConfigModule.forRoot()],
})
export class StripeModule {}
