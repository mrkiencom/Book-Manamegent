import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @MaxLength(40)
  @MinLength(8)
  password: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
  @IsString()
  @IsOptional()
  avatar?: string;
}
