import { ResponseMeta } from 'src/utils/response/response.interface';
import { Bookmark } from '../bookmark.entity';

export interface BookmarkListResponse {
  meta: ResponseMeta;
  data: Bookmark[];
}

export interface BookmarkResponse {
  meta: ResponseMeta;
  data: Bookmark;
}
