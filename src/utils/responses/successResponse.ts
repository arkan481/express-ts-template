import BaseResponse from './baseResponse';

class SuccessResponse extends BaseResponse {
  data: any;

  constructor(data: any) {
    super(true);
    this.data = data;
  }
}

export default SuccessResponse;
