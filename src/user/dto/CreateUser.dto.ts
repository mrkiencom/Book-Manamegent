import { IsNotEmpty } from 'class-validator';

export class createUserDTO {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
