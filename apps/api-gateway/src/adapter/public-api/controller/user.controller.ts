import { AuthUserGuard } from '@api-gateway/adapter/public-api/guard';
import { UpdateUserInfoReq } from '@api/grpc/user';
import { Body, Controller, Get, Logger, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from '../dto';
import { GrpcUserTransport } from 'libs/user/src/adapter/transport/grpc-transport';

@Controller('user')
export class UserController {
  private logger: Logger;

  constructor(private readonly userTransport: GrpcUserTransport) {
    this.logger = new Logger(UserController.name);
  }

  @Post('/register')
  async register(@Body() dto: RegisterUserDto) {
    return this.userTransport.register({ email: dto.email, password: dto.password });
  }

  @Post('/login')
  async login(@Body() dto: RegisterUserDto) {
    return this.userTransport.login({ email: dto.email, password: dto.password });
  }

  @UseGuards(AuthUserGuard)
  @Get('/me')
  getMe(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthUserGuard)
  @Patch('/update-info')
  updateUserInfo(@Request() req: any, @Body() updateUserDto: any) {
    const request: UpdateUserInfoReq = { id: req.user.id, ...updateUserDto };
    return this.userTransport.updateUserInfo(request);
  }
}
