import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from 'src/schema/Merchant.schema';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService],
  imports: [
    MongooseModule.forFeature([
      { name: Merchant.name, schema: MerchantSchema },
    ]),
  ],
})
export class MerchantModule {}
