import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/SignUpDto';
import { InjectModel } from '@nestjs/mongoose';
import { Merchant } from 'src/schema/Merchant.schema';
import { Model } from 'mongoose';

@Injectable()
export class MerchantService {
  constructor(@InjectModel(Merchant.name) private userModel: Model<Merchant>) {}
  signUp(signUpDto: SignUpDto) {
    this.userModel.create({
      merchant_name: signUpDto.merchant_name,
      merchant_password: signUpDto.password,
      merchant_email: signUpDto.email,
    });
  }
}
