import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TransactionModule } from 'src/transaction/transaction.module';
import { JwtModule } from '@nestjs/jwt';
import { MerchantModule } from 'src/merchant/merchant.module';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TransactionModule,
    MerchantModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  exports: [StripeService],
})
export class StripeModule {}
