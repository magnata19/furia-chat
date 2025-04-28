import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { Public } from './constants/JwtConstant';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @Public()
  async signIn(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return await this.authService.signIn(loginDto);
  }
}
