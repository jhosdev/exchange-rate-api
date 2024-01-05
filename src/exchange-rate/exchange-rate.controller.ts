import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { ExchangeRateService } from './exchange-rate.service';

@ApiTags('Exchange Rates')
@ApiBearerAuth()
@Controller('exchange-rate')
export class ExchangeRateController {
	constructor(private readonly exchangeRateService: ExchangeRateService) {}

	@Post()
	create(@Body() createExchangeRateDto: CreateExchangeRateDto) {
		return this.exchangeRateService.create(createExchangeRateDto);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.exchangeRateService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateExchangeRateDto: UpdateExchangeRateDto) {
		return this.exchangeRateService.update(id, updateExchangeRateDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.exchangeRateService.remove(id);
	}
}
