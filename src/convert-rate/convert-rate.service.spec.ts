import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';
import { ConvertRateService } from './convert-rate.service';

describe('ConvertRateService', () => {
  let service: ConvertRateService;
  let mockExchangeRateService;

  beforeEach(async () => {
    // Mock the ExchangeRateService and its findOne method
    mockExchangeRateService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConvertRateService,
        { provide: ExchangeRateService, useValue: mockExchangeRateService },
      ],
    }).compile();

    service = module.get<ConvertRateService>(ConvertRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully convert rates', async () => {
    mockExchangeRateService.findOne.mockResolvedValue(1.5);
    const dto = { from: 'USD', to: 'EUR', amount: 100 };
    const result = await service.convert(dto);

    expect(result).toEqual({
      amount: 100,
      "amount_with_exchange_rate": 150,
      "result_currency": 'EUR',
      "base_currency": 'USD',
      "exchange_rate": 1.5
    });
  });

  it('should throw an exception if the exchange rate does not exist', async () => {
    mockExchangeRateService.findOne.mockResolvedValue(null);
    const dto = { from: 'USD', to: 'EUR', amount: 100 };

    await expect(service.convert(dto)).rejects.toThrow(HttpException);
  });

});
