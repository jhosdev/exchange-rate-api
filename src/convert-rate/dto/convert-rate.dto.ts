import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ConvertRateDto {

    @ApiProperty({
        description: 'The ammount of the currency',
        example: '200',
    })
    @IsNumber()
    amount: number;

    @ApiProperty({
        description: 'The currency to convert from',
        example: 'USD',
    })
    @IsString()
    from: string;

    @ApiProperty({
        description: 'The currency to convert to',
        example: 'PEN',
    })
    @IsString()
    to: string;
}
