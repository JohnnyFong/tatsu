import { User } from 'src/modules/users/user.entity';
import { ResponseMeta } from 'src/utils/response/response.interface';

export interface AuthResponse {
  meta: ResponseMeta;
  data: {
    user: User;
    token: string;
  };
}
