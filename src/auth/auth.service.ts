import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/config/PrismaService';
import * as bcrypt from 'bcrypt';
import { ILoginDto } from './interface/ILoginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService,
    private jwtService: JwtService
  ) { }

  async signIn(loginDto: ILoginDto): Promise<{ access_token: string }> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { email: loginDto.email }
      });

      if (!user) {
        throw new BadRequestException("Usuário não encontrato.")
      }

      if (!bcrypt.compareSync(loginDto.password, user.password)) {
        throw new UnauthorizedException("Senha incorreta!")
      }

      const payload = { sub: user.id, email: user.email, name: user.name };

      return { access_token: await this.jwtService.signAsync(payload) };
    } catch (err) {
      throw new UnauthorizedException("Usuário não encontrado.");
    }

  }
}
