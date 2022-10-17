import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { notificationsProviders } from './notification.providers';
import { ResponseModule } from 'src/utils/response/response.module';

@Module({
  imports: [ResponseModule],
  providers: [NotificationsService, ...notificationsProviders],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
