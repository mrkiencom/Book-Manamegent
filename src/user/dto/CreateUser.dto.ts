import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class createUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MaxLength(40)
  @MinLength(8)
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}
