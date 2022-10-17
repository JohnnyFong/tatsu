import { Module } from '@nestjs/common';
import { BookmarksModule } from 'src/modules/bookmarks/bookmarks.module';
import { NotificationsModule } from 'src/modules/notifications/notifications.module';
import { EventsService } from './events.service';

@Module({
  providers: [EventsService],
  imports: [BookmarksModule, NotificationsModule],
})
export class EventsModule {}
