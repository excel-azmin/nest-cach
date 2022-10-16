import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';



@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getPokemon(id: number): Promise<string> {
    const { data } = await this.httpService.axiosRef.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    await this.cacheManager.set('data', data.name);
    const cachedData = await this.cacheManager.get('data');
    if(cachedData){
      console.log('data set to cache', cachedData);
     }else{
      console.log('data not set to cache');
     }

    

    return data.name;
  }
}

