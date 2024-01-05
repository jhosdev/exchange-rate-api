import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateExchangeRateDto {
    @ApiProperty({
        description: 'The exchange rate to update',
        example: '3.7',
    })
    @IsNumber()
    @IsNotEmpty()
    rate: number;
}
