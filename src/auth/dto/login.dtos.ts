import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto
{
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    password: string
}