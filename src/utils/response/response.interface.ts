export interface ResponseMeta {
  code: number;
  error_type: string;
  error_message: string;
}

export interface StandardResponse {
  meta: ResponseMeta;
  data: {
    message: string;
  };
}
