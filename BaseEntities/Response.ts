import { HttpStatus } from '@nestjs/common';

export class Response<T>
{
    Data: T;

    Message: string;

    StatusCode: HttpStatus;

    Success: Boolean
}