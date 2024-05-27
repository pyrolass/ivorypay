import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MerchantModule } from './merchant/merchant.module';
import { StripeModule } from './stripe/stripe.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    MerchantModule,
    StripeModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
