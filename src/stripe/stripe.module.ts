import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TransactionModule } from 'src/transaction/transaction.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TransactionModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
})
export class StripeModule {}
