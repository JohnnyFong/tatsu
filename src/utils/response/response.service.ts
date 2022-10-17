import { Injectable } from '@nestjs/common';
import { ResponseMeta } from './response.interface';

@Injectable()
export class ResponseService {
  handleResponse(
    res: any,
    options?: ResponseMeta,
  ): { meta: ResponseMeta; data: any } {
    return {
      meta: {
        code: 200,
        error_type: null,
        error_message: null,
        ...options,
      },
      data: res,
    };
  }
}
