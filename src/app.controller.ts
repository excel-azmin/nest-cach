import { CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Param, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('pokemon')
export class AppController {
  constructor(private readonly appService: AppService,) {}


  @UseInterceptors(CacheInterceptor) // Automatically cache the response for this endpoint
  @CacheTTL(24 * 60 * 60) // 24 hours
  @Get('/:id')
  async getPokemon(@Param('id') id: number): Promise<string> {
    return await this.appService.getPokemon(id);
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}