import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/config/PrismaService';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/JwtConstant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/AuthGuard';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' }
  })],
  providers: [AuthService, PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController]
})
export class AuthModule { }
