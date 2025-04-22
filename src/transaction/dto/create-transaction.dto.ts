import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsMongoId()
    categoryId?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsMongoId()
    userId?: string;
}
