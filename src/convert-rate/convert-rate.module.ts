import { Module } from '@nestjs/common';
import { ExchangeRateService } from 'src/exchange-rate/exchange-rate.service';
import { ConvertRateController } from './convert-rate.controller';
import { ConvertRateService } from './convert-rate.service';

@Module({
  controllers: [ConvertRateController],
  providers: [ConvertRateService, ExchangeRateService],
})
export class ConvertRateModule {}
