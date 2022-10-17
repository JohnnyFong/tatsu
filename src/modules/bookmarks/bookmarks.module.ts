import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { bookmarksProviders } from './bookmark.providers';
import { ResponseModule } from 'src/utils/response/response.module';

@Module({
  imports: [ResponseModule],
  providers: [BookmarksService, ...bookmarksProviders],
  controllers: [BookmarksController],
  exports: [BookmarksService],
})
export class BookmarksModule {}
