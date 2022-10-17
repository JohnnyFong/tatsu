import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { activitiesProviders } from './activities.providers';
import { ResponseModule } from 'src/utils/response/response.module';

@Module({
  imports: [ResponseModule],
  providers: [ActivitiesService, ...activitiesProviders],
  controllers: [ActivitiesController],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}
