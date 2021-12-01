import BaseResponse from './baseResponse';

class ErrorResponse extends BaseResponse {
  error: string;

  constructor(error: string) {
    super(false);
    this.error = error;
  }
}

export default ErrorResponse;
