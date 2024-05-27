import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUpDto';

@Injectable()
export class MerchantService {
  signUp(signUpDto: SignUpDto) {
    return signUpDto;
  }
}
