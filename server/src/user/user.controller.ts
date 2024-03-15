import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { userRequestDto } from './dtos/UserRequest.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('user')
@UseInterceptors(new SuccessInterceptor())
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async createUser(@Body() userData: userRequestDto) {
    const adminResult = await this.userService.createUser(userData)
    return adminResult
  }

  @Get('/login/:userId')
  async loginUser(@Param('userId') userId: string) {
    const adminResult = await this.userService.loginUser(userId)
    return adminResult
  }
}
