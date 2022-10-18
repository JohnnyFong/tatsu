import { ResponseMeta } from 'src/utils/response/response.interface';
import { Notification } from '../notification.entity';

export interface NotificationPaginationResponse {
  meta: ResponseMeta;
  data: {
    total: number;
    page: number;
    last_page: number;
    data: Notification[];
  };
}

export interface NotificationCountResponse {
  meta: ResponseMeta;
  data: {
    count: number;
  };
}
