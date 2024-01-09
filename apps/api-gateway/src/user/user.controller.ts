import { Body, Controller, Get, Post } from '@nestjs/common';
import { GrpcUserTransport } from './grpc-user.transport';
import { RegisterUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userTransport: GrpcUserTransport) {}

  @Post('/register')
  async register(@Body() dto: RegisterUserDto) {
    return this.userTransport.register({ email: dto.email, password: dto.password });
  }
}
