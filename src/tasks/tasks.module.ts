import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ActivitiesModule } from 'src/modules/activities/activities.module';
import { BookmarksModule } from '../modules/bookmarks/bookmarks.module';
import { TasksService } from './tasks.service';
import { QueueModule } from 'src/queue/queue.module';
import { NotificationsModule } from 'src/modules/notifications/notifications.module';

@Module({
  imports: [
    BookmarksModule,
    ActivitiesModule,
    HttpModule,
    QueueModule,
    NotificationsModule,
  ],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
