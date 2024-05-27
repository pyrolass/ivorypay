import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/SignUpDto';
import { SignInRequestDto } from './dto/SignInDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/sign_up')
  handleSignUp(@Body() signUpRequestDto: SignUpRequestDto) {
    try {
      return this.authService.signUp(signUpRequestDto);
    } catch (e) {
      throw e;
    }
  }
  @Post('/sign_in')
  handleSignIn(@Body() signInRequestDto: SignInRequestDto) {
    try {
      return this.authService.signIn(signInRequestDto);
    } catch (e) {
      throw e;
    }
  }
}
