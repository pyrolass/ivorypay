import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MerchantModule } from './merchant/merchant.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MerchantModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
