import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from "cache-manager-redis-store";
import type { RedisClientOptions } from "redis";
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      // store: typeof redisStore,
      // url: "redis://localhost:6379",
    }),
    AppModule,
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService,] ,
})
export class AppModule {}
