import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindProductDto {
  @IsOptional()
  @IsNumber()
  skip: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsBoolean()
  isDiscount: boolean;

  @IsOptional()
  @IsNumber()
  fromPrice: number;

  @IsOptional()
  @IsNumber()
  toPrice: number;
}
