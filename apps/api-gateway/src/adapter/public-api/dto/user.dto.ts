import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class LoginUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly firstName: string;

  @IsOptional()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsString()
  readonly phone: string;
}
