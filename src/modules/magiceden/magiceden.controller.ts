import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { lastValueFrom } from 'rxjs';

@Controller('magiceden')
export class MagicedenController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/collection')
  async getCollection() {
    const getRequest = this.httpService.get(
      `https://api-mainnet.magiceden.dev/v2/collections/meekolony/listings`,
    );
    const results = await (await lastValueFrom(getRequest)).data;
    return results;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/collection/stats')
  async getStat() {
    const getRequest = this.httpService.get(
      `https://api-mainnet.magiceden.dev/v2/collections/meekolony/stats`,
    );
    const results = await (await lastValueFrom(getRequest)).data;
    return results;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/token/:tokenMint')
  async getTokenMetadata(@Param('tokenMint') tokenMint: string) {
    const getRequest = this.httpService.get(
      `https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}`,
    );
    const results = await (await lastValueFrom(getRequest)).data;
    return results;
  }
}
