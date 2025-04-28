import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async signIn(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return await this.authService.signIn(loginDto);
  }
}
