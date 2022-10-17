import { Bookmark } from './bookmark.entity';
import { BOOKMARK_REPOSITORY } from '../../constants';

export const bookmarksProviders = [
  {
    provide: BOOKMARK_REPOSITORY,
    useValue: Bookmark,
  },
];
