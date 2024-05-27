import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [ConfigModule.forRoot(), HttpModule],
})
export class StripeModule {}
