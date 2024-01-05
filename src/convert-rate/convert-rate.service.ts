import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';
import { ConvertRateDto } from './dto/convert-rate.dto';
import { ConvertRateResult } from './entities/convert-rate.entity';

@Injectable()
export class ConvertRateService {

  constructor(private exchangeRateService: ExchangeRateService) {}

  private throwException(text: string){
    throw new HttpException(text, HttpStatus.BAD_REQUEST)
  }

  async convert(convertRateDto: ConvertRateDto): Promise<ConvertRateResult> {

    const { from, to, amount } = convertRateDto;

    let rate = await this.exchangeRateService.findOne(`${from}:${to}`) as number;

    if (!rate) {
      this.throwException(`Exchange rate from ${from} to ${to} does not exist`)
    }

    let response = new ConvertRateResult(
      amount,
      amount * rate,
      from,
      to,
      rate
    )

    return response
  }
}
