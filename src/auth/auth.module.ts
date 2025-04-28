import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/config/PrismaService';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/JwtConstant';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' }
  })],
  providers: [AuthService, PrismaService],
  controllers: [AuthController]
})
export class AuthModule { }
