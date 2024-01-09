import { Body, Controller, Get, Post } from '@nestjs/common';
import { GrpcUserTransport } from './grpc-user.transport';

@Controller()
export class UserController {
  constructor(private readonly userTransport: GrpcUserTransport) {}

  @Post('/hello-user')
  async helloUser(@Body() req: any) {
    return this.userTransport.helloUser(req);
  }

  @Get('/hello')
  async hello() {
    return 'hello';
  }
}
