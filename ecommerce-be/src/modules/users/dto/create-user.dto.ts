import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'email cannot be empty.' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsNotEmpty({ message: 'password cannot be empty.' })
  @IsString({ message: 'password must be a string.' })
  @MinLength(6, { message: 'password must be at least 6 characters long.' })
  password: string;

  @IsNotEmpty({ message: 'firstName cannot be empty.' })
  @IsString({ message: 'firstName must be a string.' })
  firstName: string;

  @IsNotEmpty({ message: 'lastName cannot be empty.' })
  @IsString({ message: 'lastName must be a string.' })
  lastName: string;
}
