import { GatewayError, GatewayErrorMetadata, GatewayException } from '@api-gateway/domain/exception';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IUserConfig } from '@user/configuration';
import { JWTPayload } from '@utils/jwt';
import { Request } from 'express';
import { GrpcUserTransport } from 'libs/user/src/adapter/transport/grpc-transport';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userTransport: GrpcUserTransport
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Check if the request has a valid JWT token
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new GatewayException(
        GatewayError.UNAUTHORIZED,
        { message: 'Unauthorized' },
        GatewayErrorMetadata[GatewayError.UNAUTHORIZED]
      );
    }

    // Validate JWT token
    try {
      const payload: JWTPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<IUserConfig['jwt']['jwtAccessSecret']>('jwt.jwtAccessSecret'),
      });

      const user = await this.userTransport.getUserInfo({ userId: payload.userId });

      request['user'] = user;
    } catch {
      throw new GatewayException(
        GatewayError.UNAUTHORIZED,
        { message: 'Unauthorized' },
        GatewayErrorMetadata[GatewayError.UNAUTHORIZED]
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
