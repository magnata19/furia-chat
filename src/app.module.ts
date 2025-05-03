import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ChatModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
