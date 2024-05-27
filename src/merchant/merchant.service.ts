import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpRequestDto, SignUpResponseDto } from './dto/SignUpDto';
import { InjectModel } from '@nestjs/mongoose';
import { Merchant } from 'src/schema/Merchant.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInRequestDto } from './dto/SignInDto';

@Injectable()
export class MerchantService {
  constructor(
    @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpRequestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const merchant = await this.merchantModel.find({
      merchant_email: signUpRequestDto.email,
    });

    if (merchant.length > 0) {
      throw new HttpException(
        'merchant with that email already exists',
        HttpStatus.FORBIDDEN,
      );
    }

    const hashedPassword = await bcrypt.hash(signUpRequestDto.password, 10);

    const newMerchant = await this.merchantModel.create({
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

  async signIn(signInRequest: SignInRequestDto) {
    const merchant = await this.merchantModel.findOne({
      merchant_email: signInRequest.email,
    });

    if (!merchant) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.FORBIDDEN,
      );
    }

    const validPassword = await bcrypt.compare(
      signInRequest.password,
      merchant.merchant_password,
    );

    if (!validPassword) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.FORBIDDEN,
      );
    }

    const token = this.jwtService.sign({
      id: merchant._id,
      name: merchant.merchant_name,
    });

    return {
      merchant_name: merchant.merchant_name,
      email: merchant.merchant_email,
      token: token,
    };
  }
}
