import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { CreateExchangeRateDto } from './dto/create-exchange-rate.dto';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';

@Injectable()
export class ExchangeRateService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private throwException(text: string){
    throw new HttpException(text, HttpStatus.BAD_REQUEST)
  }

  private validateExchangeRateId(id: string) {
    if (id.includes(':')) {
      let values = id.split(':')
      if (values.length === 2) {
        if (values[0] !== values[1]) {
          return true
        }
      }
    } 
    this.throwException('Invalid exchange rate id')
  }

  
  async create(createExchangeRateDto: CreateExchangeRateDto) {
    try {
      const { from, to, rate } = createExchangeRateDto;

      if (from === to) {
        this.throwException('From and To currencies cannot be the same')
      }

      const key = `exchangeRate:${from}:${to}`

      const exchangeRate = await this.cacheManager.get(key);

      if (exchangeRate) {
        this.throwException(`Exchange rate from ${from} to ${to} already exists`)
      }

      await this.cacheManager.set(key, rate, 0);
      return `Exchange rate from ${from} to ${to} has been set to ${rate}`
    }
    catch (error) {
      this.throwException(error.message)
    }
  }

  async findOne(id: string) {

    this.validateExchangeRateId(id)

    const record = await this.cacheManager.get(`exchangeRate:${id}`);

    if (!record) {
      this.throwException(`Exchange rate from ${id} does not exist`)
    }

    return record;
  }

  async update(id: string, updateExchangeRateDto: UpdateExchangeRateDto) {
    const { rate } = updateExchangeRateDto;
    const record = await this.cacheManager.get(`exchangeRate:${id}`);

    if (!record) {
      this.throwException(`Exchange rate from ${id} does not exist`)
    }

    await this.cacheManager.set(`exchangeRate:${id}`, rate, 0);

    return `Exchange rate from ${id} has been updated to ${rate}`
  }

  async remove(id: string) {

    this.validateExchangeRateId(id)

    const record = await this.cacheManager.get(`exchangeRate:${id}`);
    if (!record) {
      this.throwException(`Exchange rate from ${id} does not exist`)
    }
    
    await this.cacheManager.del(`exchangeRate:${id}`)
    return `Exchange rate from ${id} has been deleted`
  }
}
