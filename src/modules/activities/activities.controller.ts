import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseService } from 'src/utils/response/response.service';
import { ActivitiesService } from './activities.service';
import { ActivityPaginationResponse } from './interfaces/activity.interface';

@Controller('activities')
export class ActivitiesController {
  constructor(
    private readonly activitySerivce: ActivitiesService,
    private readonly responseService: ResponseService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:tokenMint')
  async findByTokenMint(
    @Param('tokenMint') tokenMint: string,
    @Request() req,
  ): Promise<ActivityPaginationResponse> {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const offset = page <= 1 ? 0 : (page - 1) * limit;

    const activity = await this.activitySerivce.findByTokenMint(
      tokenMint,
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
}
