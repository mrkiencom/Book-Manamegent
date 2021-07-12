import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MaxLength(40)
  @MinLength(8)
  password: string;
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  avatar: string;
}
