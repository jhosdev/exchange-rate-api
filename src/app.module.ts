import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConvertRateModule } from './convert-rate/convert-rate.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { UsersModule } from './users/users.module';

import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis.config';

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ExchangeRateModule, ConvertRateModule, AuthModule, UsersModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
