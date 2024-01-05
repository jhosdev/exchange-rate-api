import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let mockCacheManager;

  beforeEach(async () => {
    // Mock the cache manager
    mockCacheManager = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeRateService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    service = module.get<ExchangeRateService>(ExchangeRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a new exchange rate', async () => {
      mockCacheManager.get.mockResolvedValue(null);
      const dto = { from: 'USD', to: 'EUR', rate: 1.2 };
  
      const result = await service.create(dto);
      expect(result).toEqual(`Exchange rate from USD to EUR has been set to 1.2`);
      expect(mockCacheManager.set).toHaveBeenCalledWith('exchangeRate:USD:EUR', 1.2, 0);
    });
  
    it('should throw an exception if exchange rate already exists', async () => {
      mockCacheManager.get.mockResolvedValue(1.2);
      const dto = { from: 'USD', to: 'EUR', rate: 1.2 };
  
      await expect(service.create(dto)).rejects.toThrow(HttpException);
    });
  });
  

  describe('findOne', () => {
    it('should successfully find an existing exchange rate', async () => {
      mockCacheManager.get.mockResolvedValue(1.2);
      const id = 'USD:EUR';
  
      const result = await service.findOne(id);
      expect(result).toEqual(1.2);
    });
  
    it('should throw an exception if exchange rate does not exist', async () => {
      mockCacheManager.get.mockResolvedValue(null);
      const id = 'USD:EUR';
  
      await expect(service.findOne(id)).rejects.toThrow(HttpException);
    });
  });
  

  describe('update', () => {
    it('should successfully update an existing exchange rate', async () => {
      const id = 'USD:EUR';
      const newRate = 1.3;
      mockCacheManager.get.mockResolvedValue(1.2); // Existing rate
      mockCacheManager.set.mockResolvedValue(undefined); // Mock set operation
  
      const result = await service.update(id, { rate: newRate });
      expect(result).toEqual(`Exchange rate from ${id} has been updated to ${newRate}`);
      expect(mockCacheManager.set).toHaveBeenCalledWith(`exchangeRate:${id}`, newRate, 0);
    });
  
    it('should throw an exception if the exchange rate does not exist', async () => {
      const id = 'USD:EUR';
      mockCacheManager.get.mockResolvedValue(null); // No existing rate
  
      await expect(service.update(id, { rate: 1.3 })).rejects.toThrow(HttpException);
    });
  });
  

  describe('remove', () => {
    it('should successfully remove an existing exchange rate', async () => {
      const id = 'USD:EUR';
      mockCacheManager.get.mockResolvedValue(1.2); // Existing rate
      mockCacheManager.del.mockResolvedValue(undefined); // Mock delete operation
  
      const result = await service.remove(id);
      expect(result).toEqual(`Exchange rate from ${id} has been deleted`);
      expect(mockCacheManager.del).toHaveBeenCalledWith(`exchangeRate:${id}`);
    });
  
    it('should throw an exception if the exchange rate does not exist', async () => {
      const id = 'USD:EUR';
      mockCacheManager.get.mockResolvedValue(null); // No existing rate
  
      await expect(service.remove(id)).rejects.toThrow(HttpException);
    });
  });
  
});
