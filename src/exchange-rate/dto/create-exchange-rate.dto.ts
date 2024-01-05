import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExchangeRateDto {
    @ApiProperty({
        description: 'The currency to convert from',
        example: 'USD',
    })
    @IsString()
    @IsNotEmpty()
    from: string;

    @ApiProperty({
        description: 'The currency to convert to',
        example: 'PEN',
    })
    @IsString()
    @IsNotEmpty()
    to: string;

    @ApiProperty({
        description: 'The exchange rate',
        example: '3.5',
    })
    @IsNumber()
    @IsNotEmpty()
    rate: number;
}
