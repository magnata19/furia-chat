import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/PrismaService';
import { IUserDto } from './interface/IUserDto';
import { HashPassword } from 'src/utils/HashPassword';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async createUser(userDto: IUserDto): Promise<IUserDto> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          name: userDto.name,
          email: userDto.email,
          password: HashPassword.hashPassword(userDto.password)
        }
      });

      return user as IUserDto;
    } catch (err) {
      throw new BadRequestException('Usuário já existe.');
    }
  }
}
