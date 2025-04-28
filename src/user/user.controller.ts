import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/UserDto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('register')
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return await this.userService.createUser(userDto);
  }
}
