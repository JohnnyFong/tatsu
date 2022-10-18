import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { tokensProviders } from './token.providers';

@Module({
  providers: [TokensService, ...tokensProviders],
  controllers: [TokensController],
  exports: [TokensService],
})
export class TokensModule {}
