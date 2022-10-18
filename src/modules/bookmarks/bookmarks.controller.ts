import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookmarksService } from './bookmarks.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { ResponseService } from 'src/utils/response/response.service';
import {
  BookmarkListResponse,
  BookmarkResponse,
} from './interfaces/bookmark.interface';
import { StandardResponse } from 'src/utils/response/response.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('bookmarks')
export class BookmarksController {
  constructor(
    private readonly bookmarkService: BookmarksService,
    private responseService: ResponseService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('own')
  async findOwn(@Request() req): Promise<BookmarkListResponse> {
    const bookmark = await this.bookmarkService.findByUserId(req.user.id);
    return this.responseService.handleResponse(bookmark);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() bookmark: BookmarkDto,
    @Request() req,
  ): Promise<BookmarkResponse> {
    // check if bookmarked
    const data = await this.bookmarkService.findByIdAndTokenMint(
      bookmark,
      req.user.id,
    );
    if (data) {
      return this.responseService.handleResponse(data);
    }
    // create a new bookmark and return the newly created bookmark
    const res = await this.bookmarkService.create(bookmark, req.user.id);

    // dispatch event to crawl tokenMInt from Magic Eden
    this.eventEmitter.emit('token.create', bookmark.tokenMint);
    return this.responseService.handleResponse(res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Request() req,
  ): Promise<StandardResponse> {
    await this.bookmarkService.delete(id, req.user.id);
    return this.responseService.handleResponse('Successfully deleted');
  }
}
