import {ApiResponse} from '../../models';

export class BaseController {
  public sendResponse<T>(Data: T, response: Partial<ApiResponse<T>> = {}) {
    return new ApiResponse<T>({...response, Data});
  }
}
