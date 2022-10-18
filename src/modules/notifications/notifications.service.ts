import { Injectable, Inject } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { NOTIFICATION_REPOSITORY } from 'src/constants';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepository: typeof Notification,
  ) {}

  async bulkCreate(notification: NotificationDto[]): Promise<Notification[]> {
    return await this.notificationRepository.bulkCreate<Notification>(
      notification,
    );
  }

  async findAndCountAll(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<{
    rows: Notification[];
    count: number;
  }> {
    return await this.notificationRepository.findAndCountAll({
      distinct: true,
      order: [['createdAt', 'DESC']],
      where: {
        userId,
      },
      offset,
      limit,
    });
  }

  async updateRead(where: WhereOptions<Notification>): Promise<void> {
    await this.notificationRepository.update(
      { read: true },
      {
        where,
      },
    );
  }

  async findUnreadCount(userId: number): Promise<number> {
    return await this.notificationRepository.count({
      where: {
        userId,
        read: false,
      },
    });
  }
}
