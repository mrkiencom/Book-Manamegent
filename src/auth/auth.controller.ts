import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUser } from './dto/auth-user.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signin')
  signIn(@Body() account: AuthUser): Promise<{ accessToken: string }> {
    return this.authService.signIn(account);
  }
}
