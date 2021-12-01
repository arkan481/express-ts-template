class BaseResponse {
  success: boolean = false;

  constructor(success: boolean) {
    this.success = success;
  }
}

export default BaseResponse;
