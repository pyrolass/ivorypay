import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpRequestDto, SignUpResponseDto } from './dto/SignUpDto';
import { InjectModel } from '@nestjs/mongoose';
import { Merchant } from 'src/schema/Merchant.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name) private userModel: Model<Merchant>,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpRequestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const user = await this.userModel.find({
      merchant_email: signUpRequestDto.email,
    });

    if (user.length > 0) {
      throw new HttpException(
        'user with that email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(signUpRequestDto.password, 10);

    const newMerchant = await this.userModel.create({
      merchant_name: signUpRequestDto.merchant_name,
      merchant_password: hashedPassword,
      merchant_email: signUpRequestDto.email,
    });

    const token = this.jwtService.sign({
      id: newMerchant._id,
      name: newMerchant.merchant_name,
    });

    return {
      merchant_name: newMerchant.merchant_name,
      email: newMerchant.merchant_email,
      token: token,
    };
  }
}
