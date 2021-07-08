import { IsNotEmpty } from 'class-validator';

export class AuthUser {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
