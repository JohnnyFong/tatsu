import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BookmarksService } from 'src/modules/bookmarks/bookmarks.service';
import { NotificationsService } from 'src/modules/notifications/notifications.service';
import { ActivityEvent } from './interfaces/events.interface';

@Injectable()
export class EventsService {
  constructor(
    private readonly bookmarkService: BookmarksService,
    private readonly notificationService: NotificationsService,
  ) {}

  // handle notification event
  @OnEvent('notification.create')
  async handleNotificationCreate(payload: ActivityEvent) {
    // find user that has bookmarked the tokenMint
    const userList = await this.bookmarkService.findUserByTokenMint(
      payload.tokenMint,
    );

    const data = userList.map((u) => {
      return payload.activityList.map((activity) => {
        return {
          userId: u.userId,
          read: false,
          activityId: activity.id,
        };
      });
    });

    // create notification
    await this.notificationService.bulkCreate(data.flat());
    // TODO
    // send notification to frontend using websocket or any pub sub cloud service for push notificaiton
  }
}
