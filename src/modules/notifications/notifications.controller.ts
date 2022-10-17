import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StandardResponse } from 'src/utils/response/response.interface';
import { ResponseService } from 'src/utils/response/response.service';
import { BulkReadNotificationDto } from './dto/notification.dto';
import { NotificationPaginationResponse } from './interfaces/notification.interface';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationService: NotificationsService,
    private readonly responseService: ResponseService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/own')
  async findOwn(@Request() req): Promise<NotificationPaginationResponse> {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const offset = page <= 1 ? 0 : (page - 1) * limit;

    const activity = await this.notificationService.findAndCountAll(
      req.user.id,
      limit,
      offset,
    );
    const data = {
      total: activity.count,
      page,
      last_page:
        activity.count % limit > 0
          ? Math.floor(activity.count / limit) + 1
          : Math.floor(activity.count / limit),
      data: activity.rows,
    };

    return this.responseService.handleResponse(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/readAll')
  async readAll(@Request() req): Promise<StandardResponse> {
    await this.notificationService.updateRead({ userId: req.user.id });
    return this.responseService.handleResponse({ message: 'success' });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/bulkRead')
  async bulkRead(
    @Body() body: BulkReadNotificationDto,
  ): Promise<StandardResponse> {
    await this.notificationService.updateRead({ id: body.notificationIds });
    return this.responseService.handleResponse({ message: 'success' });
  }
}
