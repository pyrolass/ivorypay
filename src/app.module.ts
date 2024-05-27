import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MerchantModule } from './merchant/merchant.module';

@Module({
  imports: [ConfigModule.forRoot(), MerchantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
