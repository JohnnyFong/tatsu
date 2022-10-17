import { ResponseMeta } from 'src/utils/response/response.interface';
import { Activity } from '../activity.entity';

export interface ActivityPaginationResponse {
  meta: ResponseMeta;
  data: {
    total: number;
    page: number;
    last_page: number;
    data: Activity[];
  };
}
