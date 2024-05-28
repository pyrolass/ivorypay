import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Merchant } from 'src/schema/Merchant.schema';
import { GetMerchantDto } from './dto/GetMerchantDto';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
  ) {}
  async getMerchantInfo(merchant_id: string): Promise<GetMerchantDto> {
    try {
      const merchant = await this.merchantModel.findById(merchant_id);

      if (!merchant) {
        throw new HttpException('no merchant found', HttpStatus.NOT_FOUND);
      }

      return {
        merchant_name: merchant.merchant_name,
        merchant_email: merchant.merchant_email,
        merchant_balance: merchant.merchant_balance,
      };
    } catch (e) {
      throw e;
    }
  }
  async increaseMerchantBalance(merchant_id: Types.ObjectId, amount: number) {
    try {
      await this.merchantModel.findOneAndUpdate(
        { _id: merchant_id },
        { $inc: { merchant_balance: amount } },
      );
    } catch (e) {
      throw e;
    }
  }
}
