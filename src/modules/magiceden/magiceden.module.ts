import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MagicedenController } from './magiceden.controller';

@Module({
  controllers: [MagicedenController],
  imports: [HttpModule],
})
export class MagicedenModule {}
