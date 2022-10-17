import { IsNotEmpty } from 'class-validator';

export class NotificationDto {
  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  readonly activityId: number;

  @IsNotEmpty()
  readonly read: boolean;
}

export class BulkReadNotificationDto {
  @IsNotEmpty()
  readonly notificationIds: number[];
}
