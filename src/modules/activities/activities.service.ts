import { Injectable, Inject } from '@nestjs/common';
import { Activity } from './activity.entity';
import { ActivityDto } from './dto/activity.dto';
import { ACTIVITY_REPOSITORY } from '../../constants';

@Injectable()
export class ActivitiesService {
  constructor(
    @Inject(ACTIVITY_REPOSITORY)
    private readonly activityRepository: typeof Activity,
  ) {}

  async bulkCreate(activities: ActivityDto[]): Promise<Activity[]> {
    return await this.activityRepository.bulkCreate<Activity>(activities, {
      updateOnDuplicate: ['metadata'],
      returning: true,
    });
  }

  async findByTokenMint(
    tokenMint: string,
    limit: number,
    offset: number,
  ): Promise<{
    rows: Activity[];
    count: number;
  }> {
    return await this.activityRepository.findAndCountAll({
      distinct: true,
      where: {
        tokenMint,
      },
      offset,
      limit,
    });
  }

  async findIdByMetadata(metadata: string[]): Promise<Activity[]> {
    return await this.activityRepository.findAll({
      where: {
        metadata,
      },
    });
  }
}
