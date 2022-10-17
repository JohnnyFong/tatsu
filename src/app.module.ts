import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookmarksModule } from './modules/bookmarks/bookmarks.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';
import { ResponseModule } from './utils/response/response.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    BookmarksModule,
    ActivitiesModule,
    ScheduleModule.forRoot(),
    TasksModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    QueueModule,
    NotificationsModule,
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
    }),
    EventsModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
