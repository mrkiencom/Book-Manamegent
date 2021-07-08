import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthUser } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signin')
  signIn(@Body() account: AuthUser): Promise<{ accessToken: string }> {
    return this.authService.signIn(account);
  }
  @Post('/test')
  test(@Req() req) {
    console.log(req);
  }
}
